"use client";

import { useEffect, useRef, useState } from "react";
import { useData } from "../context/data-context";
import { useBluetooth } from "../hooks/useBluetooth";
import type { DC12Data } from "../types/public-types";
import styles from "./Trend.module.css";

export const TrendGraph = ({ data }: { data: DC12Data }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { sequence } = data;
	const { waveData } = useBluetooth();
	const [stats, setStats] = useState({
		casted: 0,
		accum: 0,
		maxRpm: 0,
		calorie: 0,
	});

	// グラフのデータを生成
	const graphData = Object.entries(sequence).map(([key, value]) => ({
		x: value.x,
		y: value.y,
		name: key,
	}));

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// キャンバスのサイズを設定
		const resizeCanvas = () => {
			const container = canvas.parentElement;
			if (container) {
				canvas.width = container.clientWidth;
				canvas.height = 300; // 固定高さまたは親要素の高さに合わせて調整
			}
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// キャンバスをクリア
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// グリッド線を描画
		drawGrid(ctx, canvas.width, canvas.height);

		// トレンドデータを描画
		drawTrendData(ctx, canvas.width, canvas.height, graphData);

		// Bluetoothから取得した波形データがあれば描画
		if (waveData.time.length > 0) {
			drawWaveData(ctx, canvas.width, canvas.height, waveData);
		}

		// 統計情報を計算
		calculateStats(graphData, waveData);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [graphData, waveData]);

	// グリッド線を描画する関数
	const drawGrid = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
	) => {
		ctx.strokeStyle = "#cccccc";
		ctx.lineWidth = 0.5;

		// 横線
		const rowCount = 10;
		const rowHeight = height / rowCount;
		for (let i = 0; i <= rowCount; i++) {
			const y = i * rowHeight;
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
		}

		// 縦線
		const colCount = 10;
		const colWidth = width / colCount;
		for (let i = 0; i <= colCount; i++) {
			const x = i * colWidth;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
		}
	};

	// トレンドデータを描画する関数
	const drawTrendData = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		data: { x: number; y: number; name: string }[],
	) => {
		if (data.length === 0) return;

		// X軸とY軸の範囲を計算
		const xValues = data.map((point) => point.x);
		const yValues = data.map((point) => point.y);
		const xMin = Math.min(...xValues);
		const xMax = Math.max(...xValues);
		const yMin = Math.min(...yValues);
		const yMax = Math.max(...yValues);

		// データポイントをプロットするための関数
		const getX = (x: number) => ((x - xMin) / (xMax - xMin || 1)) * width;
		const getY = (y: number) =>
			height - ((y - yMin) / (yMax - yMin || 1)) * height;

		// トレンドラインを描画
		ctx.strokeStyle = "#0066cc";
		ctx.lineWidth = 2;
		ctx.beginPath();

		for (let i = 0; i < data.length; i++) {
			const x = getX(data[i].x);
			const y = getY(data[i].y);

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}

		ctx.stroke();

		// データポイントを描画
		ctx.fillStyle = "#ff3300";
		for (const point of data) {
			const x = getX(point.x);
			const y = getY(point.y);

			ctx.beginPath();
			ctx.arc(x, y, 4, 0, Math.PI * 2);
			ctx.fill();

			// ポイントのラベルを描画
			ctx.fillStyle = "#333333";
			ctx.font = "12px Arial";
			ctx.fillText(point.name, x + 6, y - 6);
			ctx.fillStyle = "#ff3300";
		}
	};

	// 波形データを描画する関数
	const drawWaveData = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		data: { time: number[]; rev: number[]; vel: number[] },
	) => {
		if (data.time.length === 0) return;

		// X軸とY軸の範囲を計算
		const xMin = Math.min(...data.time);
		const xMax = Math.max(...data.time);
		const yMin = 0;
		const yMax = Math.max(...data.vel) * 1.1; // 余白を持たせる

		// データポイントをプロットするための関数
		const getX = (x: number) => ((x - xMin) / (xMax - xMin || 1)) * width;
		const getY = (y: number) => height - (y / yMax) * height;

		// 波形を描画
		ctx.strokeStyle = "#0066cc";
		ctx.lineWidth = 2;
		ctx.beginPath();

		for (let i = 0; i < data.time.length; i++) {
			const x = getX(data.time[i]);
			const y = getY(data.vel[i]);

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}

		ctx.stroke();

		// 回転数の変化点を強調表示
		ctx.fillStyle = "#ff3300";
		for (let i = 0; i < data.time.length; i++) {
			const x = getX(data.time[i]);
			const y = getY(data.vel[i]);

			ctx.beginPath();
			ctx.arc(x, y, 3, 0, Math.PI * 2);
			ctx.fill();
		}
	};

	// 統計情報を計算する関数
	const calculateStats = (
		data: { x: number; y: number; name: string }[],
		waveData: { time: number[]; rev: number[]; vel: number[] },
	) => {
		if (data.length === 0) return;

		// サンプルの計算ロジック（実際のアプリケーションに合わせて調整が必要）
		const castCount = data.length;
		const accumRevs = data.reduce((sum, point) => sum + point.y, 0);

		// グラフデータとウェーブデータの両方からの最大RPM値を計算
		let maxRpm = Math.max(...data.map((point) => point.y));

		// 波形データがある場合は、その最大値も考慮
		if (waveData.vel.length > 0) {
			const waveMaxRpm = Math.max(...waveData.vel);
			maxRpm = Math.max(maxRpm, waveMaxRpm);
		}

		// 消費カロリーの計算（仮のロジック）
		const calorie = Math.round(accumRevs * 0.01);

		setStats({
			casted: castCount,
			accum: accumRevs,
			maxRpm: maxRpm,
			calorie: calorie,
		});
	};

	return (
		<div className={styles.trendContainer}>
			<div className={styles.trendGraph}>
				<canvas
					ref={canvasRef}
					style={{ width: "100%", height: "100%", backgroundColor: "ivory" }}
				/>
			</div>
			<TrendInfo
				casted={stats.casted}
				accum={stats.accum}
				maxRpm={stats.maxRpm}
				calorie={stats.calorie}
			/>
		</div>
	);
};

const TrendInfo = ({
	casted,
	accum,
	maxRpm,
	calorie,
}: { casted: number; accum: number; maxRpm: number; calorie: number }) => {
	return (
		<div className={styles.trendInfo}>
			<p>キャスト数: {casted} 回 </p>
			<p>積算: {accum} 回転</p>
			<p>最高速: {maxRpm} RPM</p>
			<p>消費カロリー: {calorie} kcal</p>
		</div>
	);
};
