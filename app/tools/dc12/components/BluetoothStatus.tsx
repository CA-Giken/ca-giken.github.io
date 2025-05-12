"use client";

import { useBluetooth } from "../hooks/useBluetooth";
import styles from "./BluetoothStatus.module.css";

export const BluetoothStatus = () => {
	const { status, connect, disconnect } = useBluetooth();

	return (
		<div className={styles.statusContainer}>
			<h3>Bluetooth接続状態</h3>
			<div className={styles.statusGrid}>
				<div
					className={`${styles.statusItem} ${status.deviceStatus ? styles.active : ""}`}
				>
					デバイス
				</div>
				<div
					className={`${styles.statusItem} ${status.serverStatus ? styles.active : ""}`}
				>
					サーバー
				</div>
				<div
					className={`${styles.statusItem} ${status.serviceStatus ? styles.active : ""}`}
				>
					サービス
				</div>
				<div
					className={`${styles.statusItem} ${status.adsokStatus ? styles.active : ""}`}
				>
					ADS特性
				</div>
				<div
					className={`${styles.statusItem} ${status.woutokStatus ? styles.active : ""}`}
				>
					通知特性
				</div>
			</div>

			<div className={styles.actions}>
				<button
					type="button"
					onClick={connect}
					disabled={status.isConnecting}
					className={styles.button}
				>
					{status.isConnected
						? "再接続"
						: status.isConnecting
							? "接続中..."
							: "接続"}
				</button>
				<button
					type="button"
					disabled={!status.isConnected || status.isConnecting}
					className={styles.button}
				>
					切断
				</button>
			</div>

			{status.error && (
				<div className={styles.error}>エラー: {status.error.message}</div>
			)}
		</div>
	);
};
