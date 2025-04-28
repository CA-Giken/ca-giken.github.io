"use client";

import { DC12Tool } from "./components/DC12Tool";
import { DataProvider } from "./context/data-context";
import styles from "./page.module.css";

export default () => {
	return (
		<DataProvider>
			<DC12ToolContainer />
		</DataProvider>
	);
};

const DC12ToolContainer = () => {
	return <DC12Tool />;
};
