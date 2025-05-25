// import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
	return (
		<header className="fixed top-0 w-full max-w-[600px] z-20 h-[48px] flex items-center justify-between px-4 py-2 bg-white">
			<Link href="/">
				<h1 className="text-xl font-bold">Git Style</h1>
			</Link>

			{/* <button className="p-2" type="button">
				<Bars3Icon className="w-6 h-6" />
			</button> */}
		</header>
	);
}
