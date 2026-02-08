"use client";

import { useId } from "react";

interface InputProps {
	type?: "text" | "email" | "password";
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
	error?: string;
}

export default function Input({
	type = "text",
	placeholder,
	value,
	onChange,
	name,
	label,
	required = false,
	className = "",
	error,
}: InputProps) {
	const id = useId();
	const inputId = `${name}-${id}`;

	return (
		<div className={label ? "space-y-1.5" : ""}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-neutral-700"
				>
					{label}
				</label>
			)}
			<input
				type={type}
				name={name}
				id={inputId}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				aria-invalid={!!error}
				aria-describedby={error ? `${name}-error` : undefined}
				className={`
					w-full px-3.5 py-2.5 rounded-lg
					text-neutral-900 placeholder-neutral-400
					bg-white
					border border-neutral-200
					transition-colors duration-150
					hover:border-neutral-300
					focus:border-neutral-400 focus:ring-0 focus:outline-none
					${error ? "border-red-300" : ""}
					${className}
				`}
			/>

			{error && (
				<p id={`${name}-error`} className="text-sm text-red-500 mt-1">
					{error}
				</p>
			)}
		</div>
	);
}
