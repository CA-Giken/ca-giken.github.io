"use client";

import { useEffect, useState } from "react";
import { BTLE } from "../lib/BTLE";

interface BluetoothStatus {
	isConnected: boolean;
	isConnecting: boolean;
	deviceStatus: boolean;
	serverStatus: boolean;
	serviceStatus: boolean;
	adsokStatus: boolean;
	woutokStatus: boolean;
	parameterReadStatus: boolean; // パラメータ読み出し状態
	parameterWriteStatus: boolean; // パラメータ書き込み状態
	parameterUpdateStatus: boolean; // パラメータ更新状態
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
		parameterReadStatus: false,
		parameterWriteStatus: false,
		parameterUpdateStatus: false,
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

		// パラメータ読み出し状態ハンドラ
		const onParameterRead = () => {
			setStatus((prev) => ({
				...prev,
				parameterReadStatus: true,
			}));
			// 1秒後に状態をリセット
			setTimeout(() => {
				setStatus((prev) => ({
					...prev,
					parameterReadStatus: false,
				}));
			}, 1000);
		};

		// パラメータ書き込み状態ハンドラ
		const onParameterWrite = () => {
			setStatus((prev) => ({
				...prev,
				parameterWriteStatus: true,
			}));
			// 1秒後に状態をリセット
			setTimeout(() => {
				setStatus((prev) => ({
					...prev,
					parameterWriteStatus: false,
				}));
			}, 1000);
		};

		// パラメータ更新状態ハンドラ
		const onParameterUpdate = () => {
			setStatus((prev) => ({
				...prev,
				parameterUpdateStatus: true,
			}));
			// 1秒後に状態をリセット
			setTimeout(() => {
				setStatus((prev) => ({
					...prev,
					parameterUpdateStatus: false,
				}));
			}, 1000);
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
				parameterReadStatus: false,
				parameterWriteStatus: false,
				parameterUpdateStatus: false,
				error: null,
			});
		};

		const onError = (...args: unknown[]) => {
			const error = args[0] as Error;
			setStatus((prev) => ({
				...prev,
				error,
				isConnecting: false,
			}));
		};

		const onReceive = (...args: unknown[]) => {
			const dataView = args[0] as DataView;
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
		BTLE.on("connecting", onConnecting);
		BTLE.on("connect", onConnect);
		BTLE.on("server", onServer);
		BTLE.on("service", onService);
		BTLE.on("adsok", onAdsok);
		BTLE.on("woutok", onWoutok);
		BTLE.on("ready", onReady);
		BTLE.on("disconnect", onDisconnect);
		BTLE.on("error", onError);
		BTLE.on("receive", onReceive);
		BTLE.on("parameter_read", onParameterRead);
		BTLE.on("parameter_write", onParameterWrite);
		BTLE.on("parameter_update", onParameterUpdate);

		// クリーンアップ関数
		return () => {
			BTLE.removeListener("connecting", onConnecting);
			BTLE.removeListener("connect", onConnect);
			BTLE.removeListener("server", onServer);
			BTLE.removeListener("service", onService);
			BTLE.removeListener("adsok", onAdsok);
			BTLE.removeListener("woutok", onWoutok);
			BTLE.removeListener("ready", onReady);
			BTLE.removeListener("disconnect", onDisconnect);
			BTLE.removeListener("error", onError);
			BTLE.removeListener("receive", onReceive);
			BTLE.removeListener("parameter_read", onParameterRead);
			BTLE.removeListener("parameter_write", onParameterWrite);
			BTLE.removeListener("parameter_update", onParameterUpdate);
		};
	}, []);

	// 接続処理
	const connect = async () => {
		if (status.isConnected) {
			// 既に接続済みの場合はパラメータ転送
			await loadParameter();
			return;
		}

		return BTLE.ready();
	};

	// 切断処理
	const disconnect = async () => {
		return BTLE.disconnect();
	};

	// パラメーター読み込み
	const loadParameter = async () => {
		BTLE.emit("parameter_read");
		return BTLE.write2(0xfa01);
	};

	// パラメーター書き込み
	const saveParameter = async () => {
		BTLE.emit("parameter_write");
		return BTLE.write2(0xfa05);
	};

	// パラメーター復元
	const resumeParameter = async () => {
		BTLE.emit("parameter_update");
		return BTLE.write2(0xfa03);
	};

	// 波形データ読み込み
	const loadWaveform = async () => {
		setWaveData({
			time: [],
			rev: [],
			vel: [],
		});
		return BTLE.write2(0xfc01);
	};

	// パラメーター書き込み (アドレスと値)
	const writeParameter = async (address: number, value: number) => {
		return BTLE.write3(0xa000 | address, value);
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
