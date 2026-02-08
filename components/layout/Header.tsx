"use client";

import Link from "next/link";

export default function Header() {
	return (
		<header className="pt-12 pb-10 sm:pt-16 sm:pb-12">
			<Link href="/" className="block">
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
					Git Style
				</h1>
			</Link>
			<p className="mt-2 text-sm text-neutral-500">Your commits, your style</p>
		</header>
	);
}
