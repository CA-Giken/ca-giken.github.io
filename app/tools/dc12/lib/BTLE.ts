// ブラウザ環境用のシンプルなEventEmitter実装
class EventEmitter {
	private __emList: Record<string, Array<(...args: unknown[]) => void>> = {};

	// イベントリスナー追加
	on(events: string, fn: (...args: unknown[]) => void): this {
		const eventsList = events.split(/\s+/);
		let n = eventsList.length;

		while (n--) {
			const event = eventsList[n].toLowerCase();
			const list = this._getListeners(event);
			list.push(fn);
		}

		return this;
	}

	// イベント発火
	emit(type: string, ...args: unknown[]): boolean {
		const event = type.toLowerCase();
		const list = this._getListeners(event);

		if (list.length === 0) {
			return false;
		}

		// 特定のタイプのハンドラがある場合（onConnect, onReady等）
		const methodName = `on${event.charAt(0).toUpperCase()}${event.slice(1)}`;
		const self = this as Record<string, unknown>;
		if (typeof self[methodName] === "function") {
			(self[methodName] as (...args: unknown[]) => void)(...args);
		}

		// 登録されたリスナーを実行
		for (const listener of list) {
			listener.apply(this, args);
		}

		return true;
	}

	// イベントリスナー削除
	removeListener(events: string, fn?: (...args: unknown[]) => void): this {
		if (!events) {
			this.__emList = {};
			return this;
		}

		const eventsList = events.split(/\s+/);
		let n = eventsList.length;

		while (n--) {
			const event = eventsList[n].toLowerCase();
			const list = this._getListeners(event);

			if (!fn) {
				// 全てのリスナーを削除
				list.splice(0, list.length);
			} else {
				// 特定のリスナーを削除
				const idx = list.indexOf(fn);
				if (idx !== -1) {
					list.splice(idx, 1);
				}
			}
		}

		return this;
	}

	// ヘルパーメソッド: リスナーリストを取得
	private _getListeners(event: string): Array<(...args: unknown[]) => void> {
		if (!this.__emList) {
			this.__emList = {};
		}

		if (!this.__emList[event]) {
			this.__emList[event] = [];
		}

		return this.__emList[event];
	}
}

// Bluetooth関連の定数
const DEVICE_NAME = "arDCino";
const SERVICE_UUID = "10014246-f5b0-e881-09ab-42000ba24f83";
const CHAR_ADS_UUID = "20024246-f5b0-e881-09ab-42000ba24f83";
const CHAR_NOTIF_UUID = "20054246-f5b0-e881-09ab-42000ba24f83";

class BTLEService extends EventEmitter {
	public device: BluetoothDevice | null = null;
	public server: BluetoothRemoteGATTServer | null = null;
	public service: BluetoothRemoteGATTService | null = null;
	public adCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
	public notifCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
	public link = false;
	public timeout: NodeJS.Timeout | null = null;
	public wrevs = 1000;

	// sleep関数を追加
	async sleep(msec: number) {
		return new Promise((resolve) => setTimeout(() => resolve(true), msec));
	}

	// 接続処理
	async connect() {
		try {
			this.emit("connecting");

			this.device = await navigator.bluetooth.requestDevice({
				filters: [{ name: DEVICE_NAME }],
				optionalServices: [SERVICE_UUID],
			});

			console.log(`Device: ${this.device}`);
			this.emit("connect");

			await this.sleep(100);

			this.device.addEventListener(
				"gattserverdisconnected",
				this.onDisconnected.bind(this),
			);

			this.server = (await this.device.gatt?.connect()) ?? null;
			if (!this.server) throw new Error("Failed to connect to GATT server");
			this.emit("server");

			await this.sleep(100);

			this.service = await this.server.getPrimaryService(SERVICE_UUID);
			if (!this.service) throw new Error("Failed to get primary service");
			this.emit("service");

			await this.sleep(100);

			await this.setAds();
			await this.sleep(100);

			await this.setWout();
			await this.sleep(100);

			this.link = true;

			// 元のコードに合わせて、500ms後にreadyイベントを発火
			setTimeout(() => {
				this.emit("ready");
			}, 500);

			return true;
		} catch (error) {
			console.error("Bluetooth connection error:", error);
			this.emit("error", error);
			this.disconnect();
			this.device = null;
			this.link = false;
			return false;
		}
	}

	// Characteristic設定用メソッド（元のbtle.jsに合わせる）
	async setAds() {
		if (!this.service) return;

		try {
			this.adCharacteristic =
				await this.service.getCharacteristic(CHAR_ADS_UUID);
			if (!this.adCharacteristic)
				throw new Error("Failed to get ad characteristic");

			console.log(
				`adds prop ${JSON.stringify(this.adCharacteristic.properties)}`,
			);
			console.dir(this.adCharacteristic.properties);

			this.emit("adsok");
		} catch (error) {
			console.error("Failed to set ads characteristic:", error);
			throw error;
		}
	}

	// Notification Characteristic設定用メソッド
	async setWout() {
		if (!this.service) return;

		try {
			this.notifCharacteristic =
				await this.service.getCharacteristic(CHAR_NOTIF_UUID);
			if (!this.notifCharacteristic)
				throw new Error("Failed to get notification characteristic");

			console.log(
				`wout prop ${JSON.stringify(this.notifCharacteristic.properties)}`,
			);
			console.dir(this.notifCharacteristic.properties);

			if (this.notifCharacteristic.properties.notify) {
				this.notifCharacteristic.addEventListener(
					"characteristicvaluechanged",
					this.onReceivedData.bind(this),
				);

				await this.sleep(100);
				await this.setNotif();
			}
		} catch (error) {
			console.error("Failed to set wout characteristic:", error);
			throw error;
		}
	}

	// Notification開始
	async setNotif() {
		try {
			if (!this.notifCharacteristic) return;
			await this.notifCharacteristic.startNotifications();
			this.emit("woutok");
			console.log("Done set notif");
		} catch (error) {
			console.log(`Failed in set notif ${error}`);
			throw error;
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
			console.error(`Bluetooth disconnection error: ${error}`);
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
		this.link = false;
		console.log("Device disconnected");
		this.emit("disconnect");
	}

	// 値受信ハンドラ
	onReceivedData(event: Event) {
		const dataView = (event.target as BluetoothRemoteGATTCharacteristic).value;
		if (dataView) {
			// 元のbtle.jsに合わせて、直接receiveイベントを発火
			this.emit("receive", dataView);
		}
	}

	// 以下の処理は現在はuseBluetooth側で行っているが、
	// 必要に応じて後で使用できるようにしておく
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
	async write2(cmd: number) {
		if (!this.link || !this.adCharacteristic) return false;

		try {
			const data = new Uint8Array(2);
			data[0] = cmd >> 8; // 上位バイト
			data[1] = cmd & 0xff; // 下位バイト

			await this.adCharacteristic.writeValue(data);
			return true;
		} catch (error) {
			console.error(`write2 error: ${error}`);
			this.emit("error", error);
			this.disconnect();
			this.device = null;
			return false;
		}
	}

	// データ書き込み (3バイト: アドレスと値)
	async write3(cmd: number, val: number) {
		if (!this.link || !this.adCharacteristic) return false;

		try {
			const data = new Uint8Array(3);
			data[0] = cmd >> 8; // 上位バイト
			data[1] = cmd & 0xff; // 下位バイト
			data[2] = val;

			await this.adCharacteristic.writeValue(data);
			return true;
		} catch (error) {
			console.error(`write3 error: ${error}`);
			this.emit("error", error);
			this.disconnect();
			this.device = null;
			return false;
		}
	}

	// WebBluetoothのサポート確認
	isWebBluetoothEnabled() {
		if (navigator.bluetooth) {
			return true;
		}
		console.log(`Web Bluetooth APIは利用できません。
"Experimental Web Platform features"フラグが有効になっていることを確認してください。`);
		return false;
	}

	// 接続準備
	ready() {
		if (!this.link) {
			if (this.isWebBluetoothEnabled()) {
				return this.connect();
			}
		}
		return false;
	}

	// 再接続処理
	async reconS(event: string) {
		try {
			const server = await this.device?.gatt?.connect();
			this.emit("connect");
			this.emit("server");
			await this.sleep(100);

			const service = await server?.getPrimaryService(SERVICE_UUID);
			this.emit("service");
			await this.sleep(100);

			await this.setAds();
			await this.sleep(100);
			await this.setWout();

			this.link = true;
			setTimeout(() => {
				this.emit(event);
			}, 500);
		} catch (error) {
			console.log(`Argh! ${error}`);
			this.emit("error", error);
			this.disconnect();
			this.device = null;
			this.link = false;
		}
	}
}

// シングルトンインスタンスをエクスポート
export const BTLE = new BTLEService();
