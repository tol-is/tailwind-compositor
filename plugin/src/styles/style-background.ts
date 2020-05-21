export const bgBaselineRel = ({
	baseline,
	root,
}: {
	baseline: number;
	root: number;
}) => ({
	position: 'relative',
	backgroundRepeat: 'repeat',
	backgroundSize: `100% ${(baseline * 2) / root}rem`,
	backgroundImage: `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.08) ${baseline / root}rem,
    transparent ${baseline / root}rem
    )`,
});

export const bgBaseline = ({ baseline }: { baseline: number }) => ({
	position: 'relative',
	backgroundRepeat: 'repeat',
	backgroundSize: `100% ${baseline * 2}px`,
	backgroundImage: `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.08) ${baseline}px,
    transparent ${baseline}px
    )`,
});
