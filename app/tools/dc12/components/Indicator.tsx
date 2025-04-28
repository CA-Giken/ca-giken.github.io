"use client";

import { useCallback, useState } from "react";
import { useData } from "../context/data-context";
import { SEQUENCE_NAMES } from "../types/public-types";
import styles from "./Indicator.module.css";

interface IndicatorProps {
	onMove?: (direction: "up" | "down" | "left" | "right") => void;
	size?: "small" | "medium" | "large";
	disabled?: boolean;
}

export const Indicator = ({
	onMove,
	size = "medium",
	disabled = false,
}: IndicatorProps) => {
	const { selectedIndex, setSelectedIndex, setData } = useData();

	// ボタン押下時のハンドラ
	const handleMove = useCallback(
		(direction: "up" | "down" | "left" | "right") => {
			if (disabled) return;

			// カスタムハンドラがあれば実行
			if (onMove) {
				onMove(direction);
				return;
			}

			// 方向に応じた処理
			setData((prev) => {
				const updatedValue = prev[SEQUENCE_NAMES[selectedIndex]];
				if (!updatedValue) throw new Error("Invalid data structure");
				switch (direction) {
					case "up":
						updatedValue.y = updatedValue.y + 5;
						break;
					case "down":
						updatedValue.y = updatedValue.y - 5;
						break;
					case "left":
						updatedValue.x = updatedValue.x - 5;
						break;
					case "right":
						updatedValue.x = updatedValue.x + 5;
						break;
				}

				return {
					...prev,
					sequence: {
						...prev.sequence,
						[SEQUENCE_NAMES[selectedIndex]]: updatedValue,
					},
				};
			});
		},
		[disabled, onMove, selectedIndex, setSelectedIndex, setData],
	);

	// キーボードイベントのハンドラを設定
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (disabled) return;

			switch (e.key) {
				case "ArrowUp":
					handleMove("up");
					e.preventDefault();
					break;
				case "ArrowDown":
					handleMove("down");
					e.preventDefault();
					break;
				case "ArrowLeft":
					handleMove("left");
					e.preventDefault();
					break;
				case "ArrowRight":
					handleMove("right");
					e.preventDefault();
					break;
			}
		},
		[disabled, handleMove],
	);

	// コンポーネントがマウントされたときにキーボードイベントを登録
	useState(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	});

	// サイズに応じたクラス名を生成
	const sizeClass = styles[size] || styles.medium;

	return (
		<div className={styles.indicatorContainer}>
			<div className={styles.indicatorGrid}>
				<div className={styles.indicatorCell} />
				<div className={styles.indicatorCell}>
					<button
						type="button"
						className={`${styles.indicatorButton} ${sizeClass}`}
						onClick={() => handleMove("up")}
						disabled={disabled}
						aria-label="上へ"
					>
						↑
					</button>
				</div>
				<div className={styles.indicatorCell} />

				<div className={styles.indicatorCell}>
					<button
						type="button"
						className={`${styles.indicatorButton} ${sizeClass}`}
						onClick={() => handleMove("left")}
						disabled={disabled}
						aria-label="左へ"
					>
						←
					</button>
				</div>
				<div className={styles.indicatorCell}>
					<button
						type="button"
						className={`${styles.indicatorButton} ${sizeClass}`}
						onClick={() => handleMove("down")}
						disabled={disabled}
						aria-label="下へ"
					>
						↓
					</button>
				</div>
				<div className={styles.indicatorCell}>
					<button
						type="button"
						className={`${styles.indicatorButton} ${sizeClass}`}
						onClick={() => handleMove("right")}
						disabled={disabled}
						aria-label="右へ"
					>
						→
					</button>
				</div>
			</div>
		</div>
	);
};
