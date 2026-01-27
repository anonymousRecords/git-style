import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Input from "./common/Input";

interface UserInputGroupProps {
	username: string;
	setUsername: (username: string) => void;
	onSubmit: () => void;
}

export const UserInputGroup = ({
	username,
	setUsername,
	onSubmit,
}: UserInputGroupProps) => {
	return (
		<div>
			<Input
				type="text"
				placeholder="Enter your GitHub username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				name="username"
				label="GitHub username"
			/>

			<div className="flex justify-center">
				<button
					className="w-12 h-12 rounded-full px-3 py-2 bg-black text-white font-medium"
					type="button"
					onClick={onSubmit}
				>
					<ChevronDownIcon className="w-6 h-6" />
				</button>
			</div>
		</div>
	);
};
