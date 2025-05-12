import type { DC12Data } from "../types/public-types";
import { convertDataToCurrentRevision } from "./revision-manager";
const STORAGE_KEY_PREFIX = "dc12_";

class FileManager {
	private readonly fileExtension = ".dc12";
	private readonly defaultLocalStorageKey = `${STORAGE_KEY_PREFIX}saved_data`;

	/**
	 * PCにファイルを保存する
	 * @param filename ファイル名
	 * @param data 保存するデータ
	 * @returns 保存が成功したかどうか
	 */
	public saveToFile(filename: string, data: DC12Data): Promise<boolean> {
		let tmp_filename = filename;
		const jsonString = JSON.stringify(data, null, 2);

		// ファイル名に拡張子がなければ追加
		if (!filename.toLowerCase().endsWith(this.fileExtension)) {
			tmp_filename += this.fileExtension;
		}

		// Blobオブジェクトを作成
		const blob = new Blob([jsonString], { type: "application/json" });

		try {
			// ダウンロードリンクを作成して自動クリック
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = tmp_filename;
			document.body.appendChild(link);
			link.click();

			// クリーンアップ
			URL.revokeObjectURL(url);
			document.body.removeChild(link);
			return Promise.resolve(true);
		} catch (error) {
			console.error("ファイルの保存に失敗しました:", error);
			return Promise.resolve(false);
		}
	}

	/**
	 * PCからファイルを読み込む
	 * @param callback 読み込んだデータを処理するコールバック関数
	 */
	public loadFromFile(callback: (jsonString: string) => void): void {
		try {
			// input要素を作成
			const input = document.createElement("input");
			input.type = "file";
			input.accept = this.fileExtension;

			input.onchange = (event) => {
				const file = (event.target as HTMLInputElement).files?.[0];
				if (!file) return;

				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const jsonString = e.target?.result as string;
						callback(jsonString);
					} catch (error) {
						console.error("ファイルの解析に失敗しました:", error);
						alert("ファイルの形式が正しくありません。");
					}
				};
				reader.readAsText(file);
			};

			input.click();
		} catch (error) {
			console.error("ファイル読み込みエラー:", error);
			alert("ファイルの読み込みに失敗しました。");
		}
	}

	/**
	 * LocalStorageにデータを保存
	 * @param key 保存するキー名(省略時はデフォルト値)
	 * @param data 保存するデータ
	 */
	public saveToLocalStorage(
		data: DC12Data,
		key: string = this.defaultLocalStorageKey,
	): void {
		try {
			const jsonString = JSON.stringify(data);
			localStorage.setItem(key, jsonString);
		} catch (error) {
			console.error("LocalStorageへの保存に失敗しました:", error);
		}
	}

	/**
	 * LocalStorageからデータを読み込む
	 * @param key 読み込むキー名(省略時はデフォルト値)
	 * @returns 読み込んだデータ、なければnull
	 */
	public loadFromLocalStorage(
		callback: (jsonString: string) => void,
		key: string = this.defaultLocalStorageKey,
	) {
		try {
			const jsonString = localStorage.getItem(key);
			if (!jsonString) return null;
			callback(jsonString);
		} catch (error) {
			console.error("LocalStorageからの読み込みに失敗しました:", error);
			alert("LocalStorageからの読み込みに失敗しました。");
		}
	}

	/**
	 * LocalStorageからデータを削除
	 * @param key 削除するキー名(省略時はデフォルト値)
	 */
	public removeFromLocalStorage(
		key: string = this.defaultLocalStorageKey,
	): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error("LocalStorageからの削除に失敗しました:", error);
			alert("LocalStorageからの削除に失敗しました。");
		}
	}

	/**
	 * LocalStorage内に保存された全てのDC12ファイルのキーリストを取得
	 * @returns キーのリスト
	 */
	public getAllStorageKeys(): string[] {
		const keys: string[] = [];
		try {
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key?.startsWith("dc12_")) {
					keys.push(key);
				}
			}
		} catch (error) {
			console.error("LocalStorageのキー取得に失敗しました:", error);
		}
		return keys;
	}
}

// シングルトンとしてエクスポート
export const fileManager = new FileManager();
