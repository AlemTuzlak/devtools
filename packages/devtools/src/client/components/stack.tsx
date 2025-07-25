interface StackProps {
	gap?: "sm" | "md" | "lg"
	class?: string
	children: any
}

const GAPS = {
	sm: "gap-1",
	md: "gap-2",
	lg: "gap-4",
}

const Stack = (props: StackProps) => {
	return (
		<div class={`flex flex-col ${GAPS[props.gap || "md"]} ${props.class || ""}`}>
			{props.children}
		</div>
	)
}

export { Stack }