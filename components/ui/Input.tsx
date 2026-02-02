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
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className={label ? "space-y-2" : ""}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium"
					style={{ color: "#3d3a36" }}
				>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					type={type}
					name={name}
					id={inputId}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					required={required}
					aria-invalid={!!error}
					aria-describedby={error ? `${name}-error` : undefined}
					className={`
						w-full px-4 py-3.5 rounded-xl
						text-gray-800 placeholder-gray-400
						bg-white
						transition-all duration-200
						${error ? "ring-2 ring-red-300" : ""}
						${className}
					`}
					style={{
						border: "1px solid",
						borderColor: isFocused
							? "rgba(236, 72, 153, 0.4)"
							: "rgba(0,0,0,0.08)",
						boxShadow: isFocused
							? "0 0 0 3px rgba(236, 72, 153, 0.1), 0 2px 8px rgba(0,0,0,0.04)"
							: "0 2px 8px rgba(0,0,0,0.02)",
					}}
				/>

				{/* Focus indicator line */}
				<div
					className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
					style={{
						width: isFocused ? "40%" : "0%",
						background:
							"linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), transparent)",
					}}
				/>
			</div>

			{error && (
				<p
					id={`${name}-error`}
					className="text-sm animate-fade-in"
					style={{ color: "#ef4444" }}
				>
					{error}
				</p>
			)}
		</div>
	);
}
