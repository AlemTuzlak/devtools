import clsx from "clsx"
import { JSX } from "solid-js"

interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {
	gap?: "sm" | "md" | "lg"
	children: JSX.Element
}

const GAPS = {
	sm: "gap-1",
	md: "gap-2",
	lg: "gap-4",
}

const Stack = (props: StackProps) => {
	return (
		<div class={clsx("flex flex-col", GAPS[props.gap || "md"], props.class)} {...props}>
			{props.children}
		</div>
	)
}

export { Stack }