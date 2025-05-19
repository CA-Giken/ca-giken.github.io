"use client";

import { useEffect, useRef, useState } from "react";
import { useDataPreset } from "../hooks/useDataPreset";
import type { DataPreset } from "../lib/data-preset-service";
import styles from "./DataPresetModal.module.css";

interface DataPresetModalProps {
	isOpen: boolean;
	mode: "open" | "save" | "delete";
	onClose: () => void;
}

export const DataPresetModal = ({
	isOpen,
	mode,
	onClose,
}: DataPresetModalProps) => {
	const withDefaults = mode === "open";

	const {
		selectedPreset,
		presets,
		presetName,
		selectPreset,
		handleSavePreset,
		handleUpdatePreset,
		handleDeletePreset,
		handleLoadPreset,
		setPresetName,
	} = useDataPreset({ withDefaults });

	const modalRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [newPreset, setNewPreset] = useState(true);

	useEffect(() => {
		if (isOpen) {
			// 初期状態では新規保存に設定
			setNewPreset(true);
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && mode === "save" && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen, mode]);

	// モーダルの外側をクリックしたときに閉じる
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	// プリセット選択時の処理
	const handleSelect = (preset: DataPreset) => {
		selectPreset(preset);

		// 保存モードでデフォルトプリセット以外を選択した場合は上書き保存モードに
		if (mode === "save" && preset.id !== "default") {
			setNewPreset(false);
			setPresetName(preset.name);
		}
	};

	if (!isOpen) return null;

	// デフォルトプリセットかどうかを判定
	const isDefault = (preset: DataPreset) => preset.id === "default";

	const getModalTitle = () => {
		switch (mode) {
			case "open":
				return "プリセットを開く";
			case "save":
				return "プリセットを保存";
			case "delete":
				return "プリセットを削除";
			default:
				return "プリセット";
		}
	};

	const handleOpen = () => {
		if (selectedPreset) {
			handleLoadPreset(selectedPreset);
			onClose();
		}
	};

	const handleSave = () => {
		if (newPreset) {
			handleSavePreset();
		} else if (selectedPreset) {
			handleUpdatePreset(selectedPreset.id);
		}
		onClose();
	};
	const handleDelete = () => {
		if (selectedPreset) {
			handleDeletePreset(selectedPreset.id);
			onClose();
		}
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal} ref={modalRef}>
				<div className={styles.header}>
					<h2>{getModalTitle()}</h2>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
						aria-label="閉じる"
					>
						✕
					</button>
				</div>
				<div className={styles.content}>
					<div className={styles.presetList}>
						{presets.map((preset) => (
							<button
								type="button"
								key={preset.id}
								className={`${styles.presetItem} ${selectedPreset?.id === preset.id ? styles.selected : ""}`}
								onClick={() => {
									handleSelect(preset);
								}}
							>
								<div className={styles.presetInfo}>
									<div className={styles.presetName}>
										{preset.name}{" "}
										{isDefault(preset) && (
											<span className={styles.defaultLabel}>
												（デフォルト）
											</span>
										)}
									</div>
								</div>
							</button>
						))}
					</div>

					{mode === "save" && (
						<div className={styles.saveForm}>
							<label>
								プリセット名:
								<input
									ref={inputRef}
									type="text"
									value={presetName}
									onChange={(e) => setPresetName(e.target.value)}
									placeholder="プリセット名を入力"
								/>
							</label>
						</div>
					)}
				</div>
				<div className={styles.footer}>
					{mode === "open" && (
						<button
							type="button"
							className={styles.actionButton}
							onClick={handleOpen}
						>
							開く
						</button>
					)}
					{mode === "save" && (
						<button
							type="button"
							className={styles.actionButton}
							onClick={handleSave}
						>
							{newPreset ? "保存" : "上書き保存"}
						</button>
					)}
					{mode === "delete" && (
						<button
							type="button"
							className={styles.actionButton}
							onClick={handleDelete}
						>
							削除
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
