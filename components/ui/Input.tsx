"use client";

import { useId, useState } from "react";

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
	const [focused, setFocused] = useState(false);

	const isFloating = focused || value.length > 0;

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
			<div className="relative">
				<input
					type={type}
					name={name}
					id={inputId}
					value={value}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					required={required}
					aria-invalid={!!error}
					aria-describedby={error ? `${name}-error` : undefined}
					className={`
						w-full px-3.5 pt-5 pb-2 rounded-lg
						text-neutral-900
						bg-white
						border border-neutral-200
						transition-colors duration-150
						hover:border-neutral-300
						focus:border-neutral-900 focus:ring-0 focus:outline-none
						${error ? "border-red-300" : ""}
						${className}
					`}
				/>
				{placeholder && (
					<label
						htmlFor={inputId}
						className={`
							absolute left-3.5 pointer-events-none
							transition-all duration-200 ease-out
							origin-left
							${
								isFloating
									? "top-1.5 text-xs text-neutral-500"
									: "top-1/2 -translate-y-1/2 text-base text-neutral-400"
							}
						`}
					>
						{placeholder}
					</label>
				)}
			</div>

			{error && (
				<p id={`${name}-error`} className="text-sm text-red-500 mt-1">
					{error}
				</p>
			)}
		</div>
	);
}
