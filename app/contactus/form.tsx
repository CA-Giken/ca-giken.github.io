"use client";
import { googleFormFieldNames, googleFormUrl } from "@/constants/info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import styles from "./form.module.css";

// フォームスキーマ
const schema = z.object({
	name: z.string(),
	email: z.string().email(),
	message: z.string(),
});

const formUrl = googleFormUrl;
const formFieldNames = googleFormFieldNames;

export default () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});
	const router = useRouter();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const res = await fetch(formUrl, {
				method: "POST",
				body: provideUrlEncodedFormData(data),
				mode: "no-cors",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});
			router.push("/contactus/success");
		} catch (e) {
			alert("送信に失敗しました。ネットワーク状況を確認してください。");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>
				お名前
				<input type="text" {...register("name")} className={styles.inputName} />
			</label>
			<p className={styles.inputError}>{errors.name?.message?.toString()}</p>

			<label>
				メールアドレス
				<input
					type="email"
					{...register("email")}
					className={styles.inputEmail}
				/>
			</label>
			<p className={styles.inputError}>{errors.email?.message?.toString()}</p>

			<label>
				お問い合わせ内容
				<textarea {...register("message")} className={styles.inputTextarea} />
			</label>
			<p className={styles.inputError}>{errors.message?.message?.toString()}</p>

			<button type="submit" name="button" className={styles.inputButton}>
				送信
			</button>
		</form>
	);
};

const provideUrlEncodedFormData = (
	data: FieldValues,
): BodyInit | null | undefined => {
	const result: { [key: string]: string } = {};
	Object.keys(data).map((key) => {
		const formKey = formFieldNames[key as keyof typeof formFieldNames];
		if (formKey) {
			result[formKey] = data[key as keyof typeof data];
		}
	});
	return new URLSearchParams(result).toString();
};
