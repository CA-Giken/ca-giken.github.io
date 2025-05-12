// ブラウザ環境用のシンプルなEventEmitter実装
class EventEmitter {
	private events: Record<string, Array<(...args: unknown[]) => void>> = {};

	on(event: string, listener: (...args: unknown[]) => void): this {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener);
		return this;
	}

	emit(event: string, ...args: unknown[]): boolean {
		if (!this.events[event]) {
			return false;
		}

		// forEach の代わりに for...of を使用
		for (const listener of this.events[event]) {
			listener(...args);
		}
		return true;
	}

	removeListener(event: string, listener: (...args: unknown[]) => void): this {
		if (!this.events[event]) {
			return this;
		}
		this.events[event] = this.events[event].filter((l) => l !== listener);
		return this;
	}
}

// Bluetooth関連の定数
const DEVICE_NAME = "arDCino";
const SERVICE_UUID = "10014246-f5b0-e881-09ab-42000ba24f83";
const CHAR_ADS_UUID = "20024246-f5b0-e881-09ab-42000ba24f83";
const CHAR_NOTIF_UUID = "20054246-f5b0-e881-09ab-42000ba24f83";

class BluetoothService extends EventEmitter {
	public device: BluetoothDevice | null = null;
	public server: BluetoothRemoteGATTServer | null = null;
	public service: BluetoothRemoteGATTService | null = null;
	public adCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
	public notifCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
	public link = false;
	public timeout: NodeJS.Timeout | null = null;
	public wrevs = 1000;

	// 接続処理
	async connect() {
		try {
			this.emit("connecting");

			this.device = await navigator.bluetooth.requestDevice({
				filters: [{ name: DEVICE_NAME }],
				optionalServices: [SERVICE_UUID],
			});

			this.emit("connect");

			this.device.addEventListener(
				"gattserverdisconnected",
				this.onDisconnected.bind(this),
			);

			this.server = (await this.device.gatt?.connect()) ?? null;
			if (!this.server) throw new Error("Failed to connect to GATT server");
			this.emit("server");

			this.service = await this.server.getPrimaryService(SERVICE_UUID);
			if (!this.service) throw new Error("Failed to get primary service");
			this.emit("service");

			this.adCharacteristic =
				await this.service.getCharacteristic(CHAR_ADS_UUID);
			if (!this.adCharacteristic)
				throw new Error("Failed to get ad characteristic");
			this.emit("adsok");

			this.notifCharacteristic =
				await this.service.getCharacteristic(CHAR_NOTIF_UUID);
			if (!this.notifCharacteristic)
				throw new Error("Failed to get notification characteristic");

			await this.notifCharacteristic.startNotifications();
			this.notifCharacteristic.addEventListener(
				"characteristicvaluechanged",
				this.onReceivedData.bind(this),
			);
			this.emit("woutok");

			this.link = true;
			this.emit("ready");

			return true;
		} catch (error) {
			console.error("Bluetooth connection error:", error);
			this.emit("error", error);
			return false;
		}
	}

	// 切断処理
	async disconnect() {
		try {
			if (this.notifCharacteristic) {
				await this.notifCharacteristic.stopNotifications();
			}

			if (this.server?.connected) {
				await this.device?.gatt?.disconnect();
			}

			this.reset();
			this.emit("disconnect");
			return true;
		} catch (error) {
			console.error("Bluetooth disconnection error:", error);
			this.reset();
			this.emit("error", error);
			return false;
		}
	}

	// ステータスリセット
	reset() {
		this.device = null;
		this.server = null;
		this.service = null;
		this.adCharacteristic = null;
		this.notifCharacteristic = null;
		this.link = false;
	}

	// 切断イベントハンドラ
	onDisconnected() {
		this.reset();
		this.emit("disconnect");
	}

	// 値受信ハンドラ
	onReceivedData(event: Event) {
		const dataView = (event.target as BluetoothRemoteGATTCharacteristic).value;
		if (dataView) {
			// 波形データとパラメータデータの処理
			this.processReceivedData(dataView);
			// 生データも送信
			this.emit("receive", dataView);
		}
	}

	// 受信データの処理
	processReceivedData(dataView: DataView) {
		// データの最初のバイトでデータタイプを判断
		const dataType = dataView.getUint8(0);

		// 波形データ (0xA0)
		if (dataType === 0xa0) {
			const waveData = this.parseWaveData(dataView);
			this.emit("waveData", waveData);
		}
		// パラメータデータ (0xB0)
		else if (dataType === 0xb0) {
			const paramData = this.parseParamData(dataView);
			this.emit("paramData", paramData);
		}
		// ステータスデータ (0xC0)
		else if (dataType === 0xc0) {
			const statusData = this.parseStatusData(dataView);
			this.emit("statusData", statusData);
		}
	}

	// 波形データの解析
	parseWaveData(dataView: DataView) {
		const length = dataView.byteLength;
		const waveData = new Uint8Array(length - 1);

		for (let i = 1; i < length; i++) {
			waveData[i - 1] = dataView.getUint8(i);
		}

		return waveData;
	}

	// パラメータデータの解析
	parseParamData(dataView: DataView) {
		const paramData: Record<string, number> = {};
		const length = dataView.byteLength;

		// パラメータデータ形式: [0xB0, アドレス1, 値1, アドレス2, 値2, ...]
		for (let i = 1; i < length; i += 2) {
			if (i + 1 < length) {
				const address = dataView.getUint8(i);
				const value = dataView.getUint8(i + 1);
				paramData[`param_${address}`] = value;
			}
		}

		return paramData;
	}

	// ステータスデータの解析
	parseStatusData(dataView: DataView) {
		const statusData: Record<string, number | boolean> = {
			running: false,
			errorCode: 0,
			batteryLevel: 0,
		};

		if (dataView.byteLength >= 4) {
			statusData.running = dataView.getUint8(1) === 1;
			statusData.errorCode = dataView.getUint8(2);
			statusData.batteryLevel = dataView.getUint8(3);
		}

		return statusData;
	}

	// データ書き込み (2バイト)
	async write2(value: number) {
		if (!this.link || !this.adCharacteristic) return false;

		try {
			const buffer = new ArrayBuffer(2);
			const dataView = new DataView(buffer);
			dataView.setUint16(0, value, true); // little-endian

			await this.adCharacteristic.writeValue(buffer);
			return true;
		} catch (error) {
			console.error("Write error:", error);
			this.emit("error", error);
			return false;
		}
	}

	// データ書き込み (3バイト: アドレスと値)
	async write3(address: number, value: number) {
		if (!this.link || !this.adCharacteristic) return false;

		try {
			const buffer = new ArrayBuffer(3);
			const dataView = new DataView(buffer);
			dataView.setUint16(0, address, true); // little-endian
			dataView.setUint8(2, value);

			await this.adCharacteristic.writeValue(buffer);
			return true;
		} catch (error) {
			console.error("Write error:", error);
			this.emit("error", error);
			return false;
		}
	}

	// WebBluetoothのサポート確認
	isWebBluetoothEnabled() {
		if (navigator.bluetooth) {
			return true;
		}
		console.log(
			"Web Bluetooth APIは利用できません。\n" +
				'"Experimental Web Platform features"フラグが有効になっていることを確認してください。',
		);
		return false;
	}

	// 接続準備
	ready() {
		if (this.isWebBluetoothEnabled()) {
			return this.connect();
		}
		return false;
	}
}

// シングルトンインスタンスをエクスポート
export const bluetoothService = new BluetoothService();
