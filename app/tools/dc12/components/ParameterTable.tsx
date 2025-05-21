"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useData } from "../context/data-context";
import {
	type DC12Data,
	PARAMETER_NAMES,
	SEQUENCE_NAMES,
} from "../types/public-types";
import styles from "./ParameterTable.module.css";

interface ParameterTableProps {
	readOnly?: boolean;
}

export const ParameterTable = ({ readOnly = false }: ParameterTableProps) => {
	const { data, setData, selectedIndex } = useData();
	const { register, handleSubmit, watch, setValue, reset } = useForm<DC12Data>({
		defaultValues: data,
	});

	// データが外部から更新された場合、フォームの値をリセット
	useEffect(() => {
		reset(data);
	}, [data, reset]);

	// 値が変更されたときのハンドラ
	const onSubmit = handleSubmit((values) => {
		setData(values);
	});

	// フィールドの値が変更されたときに自動送信
	const autoSubmit = () => {
		onSubmit().catch(console.error);
	};

	// 現在選択中のシーケンス名
	const selectedSequence = SEQUENCE_NAMES[selectedIndex];

	return (
		<div className={styles.tableContainer}>
			<div className={styles.tableScrollContainer}>
				<form onChange={autoSubmit}>
					<table className={styles.parameterTable}>
						<thead>
							<tr>
								<th>パラメータ</th>
								{SEQUENCE_NAMES.map((sequence) => (
									<th
										key={sequence}
										className={
											sequence === selectedSequence ? styles.selectedColumn : ""
										}
									>
										{sequence}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Object.values(PARAMETER_NAMES).map((param) => (
								<tr key={param}>
									<td>{param}</td>
									{SEQUENCE_NAMES.map((sequence) => (
										<td
											key={`${sequence}-${param}`}
											className={`${styles.dataCell} ${
												sequence === selectedSequence
													? styles.selectedColumn
													: ""
											}`}
										>
											<input
												type="number"
												{...register(
													`sequence.${sequence}.parameters.${param}` as any,
													{
														valueAsNumber: true,
														min: 0,
														max: 255,
													},
												)}
												className={styles.cellInput}
												disabled={readOnly}
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</form>
			</div>
		</div>
	);
};
