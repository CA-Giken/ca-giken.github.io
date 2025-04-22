"use client";

import { REVISION } from "../constants";
import styles from "./DC12Tool.module.css";

export const DC12Tool = () => {
	return (
		<div className={styles.container}>
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
				<button type="button" id="swap">
					グラフ⇔トレンド
				</button>
				<hr />
				<div id="FMpop" />
			</div>

			<div className={styles.graphContainer} id="plot1">
				<canvas className={styles.graph} id="plot" />
				<div className={styles.indicatorContainer}>
					<div className={styles.indicatorCell} />
					<div className={styles.indicatorCell}>
						<button id="up" type="button" className={styles.indicator}>
							↑
						</button>
					</div>
					<div className={styles.indicatorCell} />
					<div className={styles.indicatorCell}>
						<button id="left" type="button" className={styles.indicator}>
							←
						</button>
					</div>
					<div className={styles.indicatorCell}>
						<button id="down" type="button" className={styles.indicator}>
							↓
						</button>
					</div>
					<div className={styles.indicatorCell}>
						<button id="right" type="button" className={styles.indicator}>
							→
						</button>
					</div>
				</div>
			</div>
			<div className={styles.trendContainer} id="plot2">
				<p>TrendGraph</p>
				<canvas className={styles.trend} id="trend" />
			</div>

			<div className={styles.flowContainer}>
				<button className={styles.flow} type="button" id="connect">
					接続
				</button>
				<div className={styles.flow} id="ind_dev">
					1
				</div>
				<div className={styles.flow} id="ind_srv">
					2
				</div>
				<div className={styles.flow} id="ind_svc">
					3
				</div>
				<div className={styles.flow} id="ind_adsok">
					4
				</div>
				<div className={styles.flow} id="ind_woutok">
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
				<button className={styles.flow} type="button" id="discon">
					切断
				</button>
			</div>

			<table id="rom" />

			<div className={styles.actionsContainer} id="funcbar">
				<button type="button" id="FSload">
					読出
				</button>
				<button type="button" id="FSsave">
					書込
				</button>
				<button type="button" id="FSresume">
					戻す
				</button>
				<button type="button" id="WAVload">
					波形
				</button>
			</div>
		</div>
	);
};
