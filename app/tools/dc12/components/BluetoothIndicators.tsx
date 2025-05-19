"use client";

import { useEffect, useState } from "react";
import styles from "./BluetoothIndicators.module.css";

interface BluetoothIndicatorsProps {
	status: {
		deviceStatus: boolean;
		serverStatus: boolean;
		serviceStatus: boolean;
		adsokStatus: boolean;
		woutokStatus: boolean;
	};
	onPupActive?: boolean;
	onPdwActive?: boolean;
	onWupActive?: boolean;
}

/**
 * Bluetoothの接続状態とパラメータ操作状態を示すインジケータコンポーネント
 *
 * このコンポーネントは以下のステータスを表示します:
 * 1. デバイス接続状態 (ind_dev)
 * 2. サーバー接続状態 (ind_srv)
 * 3. サービス取得状態 (ind_svc)
 * 4. アドレス特性取得状態 (ind_adsok)
 * 5. 通知特性取得状態 (ind_woutok)
 * R. パラメータ読出状態 (ind_pup)
 * W. パラメータ書込状態 (ind_pdw)
 * U. パラメータ更新状態 (ind_wup)
 */
export const BluetoothIndicators = ({
	status,
	onPupActive = false,
	onPdwActive = false,
	onWupActive = false,
}: BluetoothIndicatorsProps) => {
	// 接続インジケータ用のラベルとIDのマッピング
	const connectionIndicators = [
		{
			id: "ind_dev",
			label: "1",
			active: status.deviceStatus,
			title: "デバイス接続",
		},
		{
			id: "ind_srv",
			label: "2",
			active: status.serverStatus,
			title: "サーバー接続",
		},
		{
			id: "ind_svc",
			label: "3",
			active: status.serviceStatus,
			title: "サービス取得",
		},
		{
			id: "ind_adsok",
			label: "4",
			active: status.adsokStatus,
			title: "アドレス特性取得",
		},
		{
			id: "ind_woutok",
			label: "5",
			active: status.woutokStatus,
			title: "通知特性取得",
		},
	];

	// パラメータ操作インジケータ用のラベルとIDのマッピング
	const parameterIndicators = [
		{ id: "ind_pup", label: "R", active: onPupActive, title: "パラメータ読出" },
		{ id: "ind_pdw", label: "W", active: onPdwActive, title: "パラメータ書込" },
		{ id: "ind_wup", label: "U", active: onWupActive, title: "パラメータ更新" },
	];

	return (
		<>
			{/* 接続状態インジケータ */}
			{connectionIndicators.map((indicator) => (
				<div
					key={indicator.id}
					className={`${styles.indicator} ${indicator.active ? styles.active : ""}`}
					id={indicator.id}
					title={indicator.title}
				>
					{indicator.label}
				</div>
			))}

			{/* 区切り */}
			<div className={styles.divider}>&nbsp;</div>

			{/* パラメータ操作インジケータ */}
			{parameterIndicators.map((indicator) => (
				<div
					key={indicator.id}
					className={`${styles.parameterIndicator} ${indicator.active ? styles.active : ""}`}
					id={indicator.id}
					title={indicator.title}
				>
					{indicator.label}
				</div>
			))}
		</>
	);
};
