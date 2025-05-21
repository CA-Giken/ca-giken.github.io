"use client";

import { DataProvider } from "../context/data-context";
import { DC12Tool } from "./DC12Tool";

const DC12ToolContainer = () => {
	return <DC12Tool />;
};

export const ClientDC12Tool = () => {
	return (
		<DataProvider>
			<DC12ToolContainer />
		</DataProvider>
	);
};
