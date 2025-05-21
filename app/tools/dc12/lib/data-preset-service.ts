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
	if (typeof window === "undefined") return presets;

	const storedData = localStorage.getItem(STORAGE_KEY);
	if (!storedData) return presets;

	try {
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
	const presets = getPresets(false);

	const newPreset: DataPreset = {
		id: Date.now().toString(),
		name,
		revision: REVISION,
		data,
	};

	const updatedPresets = [...presets, newPreset];
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));

	return newPreset;
};

/**
 * プリセットを削除
 */
export const deletePreset = (id: string): boolean => {
	const presets = getPresets(false);
	const updatedPresets = presets.filter((preset) => preset.id !== id);

	if (presets.length === updatedPresets.length) {
		return false;
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
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

	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
	return updatedPreset;
};
