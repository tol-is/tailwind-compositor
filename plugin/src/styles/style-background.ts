export const bgBaselineRel = ({
	baseline,
	root,
	color,
}: {
	baseline: number;
	root: number;
	color?: string;
}) => ({
	position: 'relative',
	backgroundRepeat: 'repeat',
	backgroundSize: `100% ${baseline / root}rem`,
	backgroundImage: `linear-gradient(
		${color} 1px,
		transparent 0
	)`,
});

export const bgBaseline = ({
	baseline,
	color,
}: {
	baseline: number;
	color: string;
}) => ({
	position: 'relative',
	backgroundRepeat: 'repeat',
	backgroundImage: `linear-gradient(
		${color} 1px,
		transparent 0
	)`,
	backgroundSize: `100% ${baseline}px`,
});
