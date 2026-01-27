import Chip from "./common/Chip";

type Tag = {
	label: "plant" | 'hair';
};

const TAGS: Tag[] = [{ label: "plant" }];

interface FilterBarProps {
	theme: string;
	setTheme: (theme: string) => void;
}

export const FilterBar = ({ theme, setTheme }: FilterBarProps) => {
	return (
		<div className="flex flex-wrap gap-1">
			{TAGS.map((tag) => (
				<Chip
					key={tag.label}
					label={tag.label}
					active={theme === tag.label}
					onClick={() => setTheme(tag.label)}
				/>
			))}
		</div>
	);
};