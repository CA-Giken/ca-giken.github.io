"use client";

import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import defaultDC12Data from "../data/presets/default";
import type { DC12Data } from "../types/public-types";

interface DataContextState {
	data: DC12Data;
	setData: React.Dispatch<React.SetStateAction<DC12Data>>;
}

const DataContext = createContext<DataContextState | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<DC12Data>(defaultDC12Data);

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

// カスタムフック
export function useData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
