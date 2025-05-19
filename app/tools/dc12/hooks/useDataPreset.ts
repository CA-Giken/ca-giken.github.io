"use client";

import { useEffect, useState } from "react";
import { useData } from "../context/data-context";
import {
	type DataPreset,
	deletePreset,
	getPresets,
	savePreset,
	updatePreset,
} from "../lib/data-preset-service";

export const useDataPreset = () => {
	const { data, setData } = useData();
	const [selectedPreset, setSelectedPreset] = useState<DataPreset | null>(null);
	const [presets, setPresets] = useState<DataPreset[]>([]);
	const [presetName, setPresetName] = useState("");

	// プリセットリストを読み込む
	useEffect(() => {
		setPresets(getPresets());
	}, []);

	// プリセットを保存（新規）
	const handleSavePreset = () => {
		if (!presetName.trim()) return;

		const newPreset = savePreset(presetName.trim(), data);
		setPresets(getPresets()); // 最新のプリセットリストを再取得
	};

	// プリセットを上書き保存
	const handleUpdatePreset = (id: string) => {
		// デフォルトプリセットは上書きできない
		if (id === "default") throw new Error("Cannot update default preset");

		const updated = updatePreset(id, presetName.trim(), data);
		if (updated) {
			setPresets(getPresets()); // 最新のプリセットリストを再取得
		}
	};

	// プリセットを読み込む
	const handleLoadPreset = (preset: DataPreset) => {
		setData(preset.data);
	};

	// プリセットを削除
	const handleDeletePreset = (id: string) => {
		// デフォルトプリセットは削除できない
		if (id === "default") throw new Error("Cannot delete default preset");

		if (deletePreset(id)) {
			setPresets(getPresets()); // 最新のプリセットリストを再取得
		}
	};

	// プリセットを選択
	const selectPreset = (preset: DataPreset) => {
		setSelectedPreset(preset);
		setPresetName(preset.name);
	};

	return {
		presets,
		selectedPreset,
		presetName,
		setPresetName,
		handleSavePreset,
		handleUpdatePreset,
		handleLoadPreset,
		handleDeletePreset,
		selectPreset,
	};
};
