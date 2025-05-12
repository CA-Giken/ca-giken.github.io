"use client";

import { useEffect, useState } from "react";
import { REVISION } from "../constants";
import { useData } from "../context/data-context";
import { useBluetooth } from "../hooks/useBluetooth";
import styles from "./DC12Tool.module.css";
import { Indicator } from "./Indicator";
import { LogarithmicGraph } from "./LogarithmicGraph";
import { ParameterTable } from "./ParameterTable";
import { TrendGraph } from "./Trend";

export const DC12Tool = () => {
	const { data } = useData();
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

	const handleModeChange = () => {
		setMode((prevMode) => (prevMode === "graph" ? "trend" : "graph"));
	};

	return (
		<div className={styles.container}>
			<h1>DC12 Tool</h1>
			<p>Rev.{REVISION}</p>
			<div className={styles.dropdown}>
				<button type="button" id="FMload">
					開く
				</button>
				<button type="button" id="FMsave">
					保存
				</button>
				<button type="button" id="FMremove">
					削除
				</button>
				<span style={{ flex: 1 }} />
				<button type="button" onClick={handleModeChange}>
					グラフ⇔トレンド
				</button>
				<hr />
				<div id="FMpop" />
			</div>
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
				<div
					className={`${styles.flow} ${status.deviceStatus ? styles.active : ""}`}
					id="ind_dev"
				>
					1
				</div>
				<div
					className={`${styles.flow} ${status.serverStatus ? styles.active : ""}`}
					id="ind_srv"
				>
					2
				</div>
				<div
					className={`${styles.flow} ${status.serviceStatus ? styles.active : ""}`}
					id="ind_svc"
				>
					3
				</div>
				<div
					className={`${styles.flow} ${status.adsokStatus ? styles.active : ""}`}
					id="ind_adsok"
				>
					4
				</div>
				<div
					className={`${styles.flow} ${status.woutokStatus ? styles.active : ""}`}
					id="ind_woutok"
				>
					5
				</div>
				<div className={styles.flow}>&nbsp;</div>
				<div className={styles.flow} id="ind_pup">
					R
				</div>
				<div className={styles.flow} id="ind_pdw">
					W
				</div>
				<div className={styles.flow} id="ind_wup">
					U
				</div>
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
