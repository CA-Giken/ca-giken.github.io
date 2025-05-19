import defaultDC12Data from "../data/presets/default";
import type { DC12Data } from "../types/public-types";

/**
 * プリセットのデータ構造
 */
export interface DataPreset {
	id: string;
	name: string;
	data: DC12Data;
}

const DEFAULT_PRESETS: DataPreset[] = [
	{
		id: "default",
		name: "Default Preset",
		data: defaultDC12Data,
	},
];

const STORAGE_KEY = "dc12-presets";

/**
 * ローカルストレージからプリセットリストを取得
 */
export const getPresets = (): DataPreset[] => {
	if (typeof window === "undefined") return [...DEFAULT_PRESETS];

	const storedData = localStorage.getItem(STORAGE_KEY);
	if (!storedData) return [...DEFAULT_PRESETS];

	try {
		return [...JSON.parse(storedData), ...DEFAULT_PRESETS];
	} catch (error) {
		console.error("Failed to parse presets:", error);
		return [...DEFAULT_PRESETS];
	}
};

/**
 * プリセットを保存
 */
export const savePreset = (name: string, data: DC12Data): DataPreset => {
	const presets = getPresets();

	const newPreset: DataPreset = {
		id: Date.now().toString(),
		name,
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
	const presets = getPresets();
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
	const presets = getPresets();
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
