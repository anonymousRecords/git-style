import Input from "./common/Input";

interface UserInputGroupProps {
	username: string;
	setUsername: (username: string) => void;
}

export const UserInputGroup = ({
	username,
	setUsername,
}: UserInputGroupProps) => {
	return (
		<Input
			type="text"
			placeholder="Enter your GitHub username"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			name="username"
			label="GitHub Username"
		/>
	);
};
