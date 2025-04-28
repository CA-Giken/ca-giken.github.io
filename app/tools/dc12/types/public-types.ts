export const SEQUENCE_NAMES = ["1", "2", "3", "4", "5", "R", "W", "U"] as const;
export enum PARAMETER_NAMES {
	Zpos = "Zpos",
	UD8 = "UD8",
	UD16 = "UD16",
	BX0 = "BX0",
	CX0 = "CX0",
	DX0 = "DX0",
	EX0 = "EX0",
	Shared1 = "Shared1",
	Shared2 = "Shared2",
	Shared3 = "Shared3",
	Shared4 = "Shared4",
	Shared5 = "Shared5",
	Shared6 = "Shared6",
	Shared7 = "Shared7",
}

export type DC12Data = {
	name: string;
	revision: string;
	sequence: Record<
		(typeof SEQUENCE_NAMES)[number],
		{
			x: number;
			y: number;
			parameters: {
				[key in PARAMETER_NAMES]: number;
			};
		}
	>;
};
