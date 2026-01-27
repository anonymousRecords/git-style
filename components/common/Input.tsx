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
		<div className="mb-4">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-black mb-1"
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
				className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:border-black ${className}`}
			/>
			{error && (
				<p id={`${name}-error`} className="mt-1 text-sm text-red-500">
					{error}
				</p>
			)}
		</div>
	);
}
