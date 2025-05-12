import { REVISION } from "../constants";
import type { DC12Data } from "../types/public-types";

const COMPATIBLE_REVISIONS = ["230711", "300000"];

export const isCompatibleData = (data: string): boolean => {
	// TODO: Data Validation

	const revision = JSON.parse(data).revision;
	return COMPATIBLE_REVISIONS.includes(revision ?? "unknown");
};

export const convertDataToCurrentRevision = (data: string): DC12Data => {
	if (!isCompatibleData(data)) {
		throw new Error("Incompatible data revision");
	}

	const revision = JSON.parse(data).revision;
	if (revision === "230711") {
		return rev230711to300000(data);
	}

	if (revision === "300000") {
		return JSON.parse(data) as DC12Data;
	}

	throw new Error("Unreachable revision");
};

const rev230711to300000 = (data: string): DC12Data => {
	return {
		...JSON.parse(data),
		revision: "300000",
	};
};
