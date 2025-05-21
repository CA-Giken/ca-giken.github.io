import { REVISION } from "../constants";
import defaultDC12Data from "../data/presets/default";
import type { DC12Data } from "../types/public-types";
import { checkRevisionCompatibility } from "./revision-check";

/**
 * プリセットのデータ構造
 */
export interface DataPreset {
	id: string;
	name: string;
	revision: string;
	data: DC12Data;
}

const DEFAULT_PRESETS: DataPreset[] = [
	{
		id: "default",
		name: "Default Preset",
		revision: "300000",
		data: defaultDC12Data,
	},
];

const STORAGE_KEY = "dc12-presets";

/**
 * ローカルストレージからプリセットリストを取得
 */
export const getPresets = (defaults: boolean): DataPreset[] => {
	let presets: DataPreset[] = [];
	if (defaults) presets = [...DEFAULT_PRESETS];

	// サーバーサイドレンダリング時はデフォルトプリセットのみ返す
	if (typeof window === "undefined") return presets;

	try {
		const storedData = localStorage.getItem(STORAGE_KEY);
		if (!storedData) return presets;

		presets = [...JSON.parse(storedData), ...presets];
		// リビジョンチェック
		presets = presets.filter((preset) => {
			return checkRevisionCompatibility(REVISION, preset.data);
		});
		return presets;
	} catch (error) {
		console.error("Failed to parse presets:", error);
		return presets;
	}
};

/**
 * プリセットを保存
 */
export const createPreset = (
	id: string,
	name: string,
	data: DC12Data,
): DataPreset => {
	const newPreset: DataPreset = {
		id: Date.now().toString(),
		name,
		revision: REVISION,
		data,
	};

	// サーバーサイドレンダリング時は保存をスキップ
	if (typeof window === "undefined") return newPreset;

	const presets = getPresets(false);
	const updatedPresets = [...presets, newPreset];

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
	} catch (error) {
		console.error("Failed to save preset:", error);
	}

	return newPreset;
};

/**
 * プリセットを削除
 */
export const deletePreset = (id: string): boolean => {
	// サーバーサイドレンダリング時は削除をスキップ
	if (typeof window === "undefined") return false;

	const presets = getPresets(false);
	const updatedPresets = presets.filter((preset) => preset.id !== id);

	if (presets.length === updatedPresets.length) {
		return false;
	}

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
	} catch (error) {
		console.error("Failed to delete preset:", error);
		return false;
	}

	return true;
};

/**
 * プリセットを更新
 */
export const updatePreset = (
	id: string,
	name: string,
	data: DC12Data,
): DataPreset | null => {
	// サーバーサイドレンダリング時は更新をスキップ
	if (typeof window === "undefined") return null;

	const presets = getPresets(false);
	const presetIndex = presets.findIndex((preset) => preset.id === id);

	if (presetIndex === -1) {
		return null;
	}

	const updatedPreset: DataPreset = {
		...presets[presetIndex],
		name,
		data,
	};

	const updatedPresets = [...presets];
	updatedPresets[presetIndex] = updatedPreset;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
	} catch (error) {
		console.error("Failed to update preset:", error);
		return null;
	}

	return updatedPreset;
};
