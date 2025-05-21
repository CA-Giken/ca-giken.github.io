"use client";

import {
	CategoryScale,
	type ChartData,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	LogarithmicScale,
	type Point,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line, Scatter } from "react-chartjs-2";
import { useData } from "../context/data-context";
import { type DC12Data, SEQUENCE_NAMES } from "../types/public-types";

ChartJS.register(
	LinearScale,
	LogarithmicScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
);

type LogarithmicGraphProps = {
	data?: DC12Data;
};

export const LogarithmicGraph = ({ data }: LogarithmicGraphProps) => {
	const [chartData, setChartData] = useState<
		ChartData<"line", Point[], unknown> | undefined
	>(undefined);
	const { selectedIndex } = useData();

	// グラフのオプション設定
	const options = {
		responsive: true,
		scales: {
			y: {
				title: {
					display: true,
					text: "y",
				},
				min: 0,
				max: 600,
			},
			x: {
				type: "logarithmic" as const,
				title: {
					display: true,
					text: "x",
				},
				min: 1,
				max: 5000,
			},
		},
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: false,
			},
			tooltip: {
				enabled: false, // デフォルトのツールチップを無効化
				external: externalTooltipHandler,
			},
		},
	};

	// データが変更されたときにチャートデータを更新
	useEffect(() => {
		// 表示するパラメータに基づいてデータセットを作成
		const sortLabels = SEQUENCE_NAMES;
		if (data === undefined) {
			setChartData(undefined);
		} else {
			const datasets = [
				{
					label: "dataset",
					backgroundColor: "rgba(255, 99, 132, 1)",
					data: sortLabels.map((sequence_name) => {
						const step = data.sequence[sequence_name];
						// 選択されているインデックスのみスタイルを変更
						if (sequence_name === SEQUENCE_NAMES[selectedIndex]) {
							return {
								x: Math.max(1, step.x),
								y: step.y,
								pointRadius: 8,
								pointBackgroundColor: "rgba(54, 162, 235, 1)",
								pointBorderColor: "rgba(0, 0, 0, 1)",
								pointBorderWidth: 4,
							};
						}
						return { x: Math.max(1, step.x), y: step.y };
					}),
				},
			];

			setChartData({
				datasets,
			});
		}
	}, [data, selectedIndex]);

	return (
		<div style={{ width: "100%", padding: 10 }}>
			{data && chartData ? (
				<>
					<Line options={options} data={chartData} />
					<div
						id="chartjs-tooltip"
						className="custom-tooltip"
						style={{
							opacity: 0,
							position: "absolute",
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							color: "white",
							borderRadius: "5px",
							padding: "10px",
							fontSize: "14px",
							pointerEvents: "none",
							transform: "translate(-50%, 0)",
							transition: "all .1s ease",
						}}
					/>
				</>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
					}}
				>
					データが選択されていないか、使用できません
				</div>
			)}
		</div>
	);
};

const externalTooltipHandler = (context: any) => {
	// ツールチップ要素の取得
	const { chart, tooltip } = context;
	const tooltipEl = document.getElementById("chartjs-tooltip");

	if (!tooltipEl) {
		return;
	}

	// ツールチップが非表示の場合は早期リターン
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = "0";
		return;
	}

	// ツールチップの内容を設定
	if (tooltip.body) {
		const titleLines = tooltip.title || [];
		const bodyLines = tooltip.body.map((b: any) => b.lines);

		// データポイントの情報を取得
		const dataIndex = tooltip.dataPoints[0].dataIndex;
		const datasetIndex = tooltip.dataPoints[0].datasetIndex;
		const value = chart.data.datasets[datasetIndex].data[dataIndex];
		const sequenceName = SEQUENCE_NAMES[dataIndex];

		// HTML内容の作成
		let innerHtml = "<div>";

		innerHtml +=
			'<div class="tooltip-title" style="font-weight: bold; margin-bottom: 5px;">';
		innerHtml += `${sequenceName}`;
		innerHtml += "</div>";

		innerHtml +=
			'<div class="tooltip-body" style="display: flex; flex-direction: column;">';
		innerHtml += `<span>${Math.round(value.x * 100) / 100}, ${Math.round(value.y * 100) / 100}</span>`;
		innerHtml += "</div>";

		innerHtml += "</div>";

		tooltipEl.innerHTML = innerHtml;
	}

	// ツールチップの位置を設定
	const position = chart.canvas.getBoundingClientRect();

	// 表示スタイルを設定
	tooltipEl.style.opacity = "1";
	tooltipEl.style.left = `${position.left + window.pageXOffset + tooltip.caretX}px`;
	tooltipEl.style.top = `${position.top + window.pageYOffset + tooltip.caretY}px`;
	tooltipEl.style.font = tooltip.options.bodyFont.string;
	tooltipEl.style.padding = `${tooltip.padding}px ${tooltip.padding}px`;
};
