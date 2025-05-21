"use client";

import { useEffect, useRef, useState } from "react";
import { REVISION } from "../constants";
import { useData } from "../context/data-context";
import { useBluetooth } from "../hooks/useBluetooth";
import { useDataPreset } from "../hooks/useDataPreset";
import { BluetoothIndicators } from "./BluetoothIndicators";
import styles from "./DC12Tool.module.css";
import { DataPresetModal } from "./DataPresetModal";
import { Indicator } from "./Indicator";
import { LogarithmicGraph } from "./LogarithmicGraph";
import { ParameterTable } from "./ParameterTable";
import { TrendGraph } from "./Trend";

export const DC12Tool = () => {
	const { data, setData } = useData();
	const [mode, setMode] = useState<"graph" | "trend">("graph");

	const {
		status,
		connect,
		disconnect,
		loadParameter,
		saveParameter,
		resumeParameter,
		loadWaveform,
	} = useBluetooth();

	const [modalState, setModalState] = useState({
		isOpen: false,
		mode: "open" as "open" | "save" | "delete",
	});

	const openModal = (mode: "open" | "save" | "delete") => {
		setModalState({ isOpen: true, mode });
	};
	const closeModal = () => {
		setModalState({ isOpen: false, mode: "open" });
	};

	const handleModeChange = () => {
		setMode((prevMode) => (prevMode === "graph" ? "trend" : "graph"));
	};

	return (
		<div className={styles.container}>
			<h1>DC12 Tool</h1>
			<p>Rev.{REVISION}</p>
			<div className={styles.dropdown}>
				<button type="button" onClick={() => openModal("open")}>
					開く
				</button>
				<button type="button" onClick={() => openModal("save")}>
					保存
				</button>
				<button type="button" onClick={() => openModal("delete")}>
					削除
				</button>
				<span style={{ flex: 1 }} />
				<button type="button" onClick={handleModeChange}>
					グラフ⇔トレンド
				</button>
				<hr />
				<div id="FMpop" />
			</div>

			{/* データプリセットモーダル */}
			<DataPresetModal
				isOpen={modalState.isOpen}
				mode={modalState.mode}
				onClose={closeModal}
			/>
			{mode === "graph" && (
				<div className={styles.graphContainer} id="plot1">
					<LogarithmicGraph data={data} />
					<Indicator />
				</div>
			)}
			{mode === "trend" && (
				<div className={styles.trendContainer} id="plot2">
					<TrendGraph data={data} />
				</div>
			)}
			<div className={styles.flowContainer}>
				<button className={styles.flow} type="button" onClick={connect}>
					{status.isConnected
						? "転送"
						: status.isConnecting
							? "接続処理中"
							: "接続"}
				</button>
				<BluetoothIndicators
					status={status}
					// BTLEの操作に応じてアクティブ状態を切り替える
					onPupActive={status.parameterReadStatus}
					onPdwActive={status.parameterWriteStatus}
					onWupActive={status.parameterUpdateStatus}
				/>
				<button className={styles.flow} type="button" onClick={disconnect}>
					切断
				</button>
			</div>

			<ParameterTable />

			<div className={styles.actionsContainer} id="funcbar">
				<button type="button" onClick={loadParameter}>
					読出
				</button>
				<button type="button" onClick={saveParameter}>
					書込
				</button>
				<button type="button" onClick={resumeParameter}>
					戻す
				</button>
				<button type="button" onClick={loadWaveform}>
					波形
				</button>
			</div>
		</div>
	);
};
