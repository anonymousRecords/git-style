import Input from "@/components/ui/Input";

interface UserInputProps {
	username: string;
	setUsername: (username: string) => void;
}

export const UserNameInput = ({ username, setUsername }: UserInputProps) => {
	return (
		<Input
			type="text"
			placeholder="Enter your GitHub username"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			name="username"
		/>
	);
};
