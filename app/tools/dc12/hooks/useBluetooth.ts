"use client";

import { useEffect, useState } from "react";
import { bluetoothService } from "../lib/bluetooth-service";

interface BluetoothStatus {
	isConnected: boolean;
	isConnecting: boolean;
	deviceStatus: boolean;
	serverStatus: boolean;
	serviceStatus: boolean;
	adsokStatus: boolean;
	woutokStatus: boolean;
	error: Error | null;
}

export function useBluetooth() {
	const [status, setStatus] = useState<BluetoothStatus>({
		isConnected: false,
		isConnecting: false,
		deviceStatus: false,
		serverStatus: false,
		serviceStatus: false,
		adsokStatus: false,
		woutokStatus: false,
		error: null,
	});

	const [waveData, setWaveData] = useState<{
		time: number[];
		rev: number[];
		vel: number[];
	}>({
		time: [],
		rev: [],
		vel: [],
	});

	useEffect(() => {
		const onConnect = () => {
			setStatus((prev) => ({
				...prev,
				deviceStatus: true,
			}));
		};

		const onConnecting = () => {
			setStatus((prev) => ({
				...prev,
				isConnecting: true,
			}));
		};

		const onServer = () => {
			setStatus((prev) => ({
				...prev,
				serverStatus: true,
			}));
		};

		const onService = () => {
			setStatus((prev) => ({
				...prev,
				serviceStatus: true,
			}));
		};

		const onAdsok = () => {
			setStatus((prev) => ({
				...prev,
				adsokStatus: true,
			}));
		};

		const onWoutok = () => {
			setStatus((prev) => ({
				...prev,
				woutokStatus: true,
			}));
		};

		const onReady = () => {
			setStatus((prev) => ({
				...prev,
				isConnected: true,
				isConnecting: false,
			}));
		};

		const onDisconnect = () => {
			setStatus({
				isConnected: false,
				isConnecting: false,
				deviceStatus: false,
				serverStatus: false,
				serviceStatus: false,
				adsokStatus: false,
				woutokStatus: false,
				error: null,
			});
		};

		const onError = (error: Error) => {
			setStatus((prev) => ({
				...prev,
				error,
				isConnecting: false,
			}));
		};

		const onReceive = (dataView: DataView) => {
			const des = dataView.getUint16(0);
			const det = des & 0xf000;

			if (det === 0) {
				// 波形データ
				const time = dataView.getUint16(2);
				const rpm = (Math.PI * 2e6) / dataView.getUint16(4);
				const rev = des;

				setWaveData((prev) => ({
					time: [...prev.time, time],
					rev: [...prev.rev, rev],
					vel: [...prev.vel, rpm],
				}));
			}
		};

		// イベントリスナーを登録
		bluetoothService.on("connecting", onConnecting);
		bluetoothService.on("connect", onConnect);
		bluetoothService.on("server", onServer);
		bluetoothService.on("service", onService);
		bluetoothService.on("adsok", onAdsok);
		bluetoothService.on("woutok", onWoutok);
		bluetoothService.on("ready", onReady);
		bluetoothService.on("disconnect", onDisconnect);
		bluetoothService.on("error", onError);
		bluetoothService.on("receive", onReceive);

		// クリーンアップ関数
		return () => {
			bluetoothService.removeListener("connecting", onConnecting);
			bluetoothService.removeListener("connect", onConnect);
			bluetoothService.removeListener("server", onServer);
			bluetoothService.removeListener("service", onService);
			bluetoothService.removeListener("adsok", onAdsok);
			bluetoothService.removeListener("woutok", onWoutok);
			bluetoothService.removeListener("ready", onReady);
			bluetoothService.removeListener("disconnect", onDisconnect);
			bluetoothService.removeListener("error", onError);
			bluetoothService.removeListener("receive", onReceive);
		};
	}, []);

	// 接続処理
	const connect = async () => {
		if (status.isConnected) {
			// 既に接続済みの場合はパラメータ転送
			await loadParameter();
			return;
		}

		return bluetoothService.ready();
	};

	// 切断処理
	const disconnect = async () => {
		return bluetoothService.disconnect();
	};

	// パラメーター読み込み
	const loadParameter = async () => {
		return bluetoothService.write2(0xfa01);
	};

	// パラメーター書き込み
	const saveParameter = async () => {
		return bluetoothService.write2(0xfa05);
	};

	// パラメーター復元
	const resumeParameter = async () => {
		return bluetoothService.write2(0xfa03);
	};

	// 波形データ読み込み
	const loadWaveform = async () => {
		setWaveData({
			time: [],
			rev: [],
			vel: [],
		});
		return bluetoothService.write2(0xfc01);
	};

	// パラメーター書き込み (アドレスと値)
	const writeParameter = async (address: number, value: number) => {
		return bluetoothService.write3(0xa000 | address, value);
	};

	return {
		status,
		waveData,
		connect,
		disconnect,
		loadParameter,
		saveParameter,
		resumeParameter,
		loadWaveform,
		writeParameter,
	};
}
