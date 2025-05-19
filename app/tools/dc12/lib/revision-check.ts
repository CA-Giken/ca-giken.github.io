import type { DC12Data } from "../types/public-types";

export const checkRevisionCompatibility = (
	revision: string,
	data: DC12Data,
): boolean => {
	return data.revision === revision;
};
