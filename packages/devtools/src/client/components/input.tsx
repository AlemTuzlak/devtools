import clsx from "clsx"
import { JSX } from "solid-js"

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	hint?: string
}

export const Label = (props: JSX.LabelHTMLAttributes<HTMLLabelElement> & { children: JSX.Element }) => {
	return (
		<label for={props.name} class={clsx("block text-white text-sm", props.class)} {...props}>
			{props.children}
		</label>
	)
}

export const Hint = (props: { children: JSX.Element }) => {
	return <p class="text-sm text-gray-500">{props.children}</p>
}

export const Input = (props: InputProps) => {
	return (
		<div class="flex w-full flex-col gap-1">
			{props.label && <Label for={props.name}>{props.label}</Label>}
			<input
				name={props.name}
				id={props.name}
				class={clsx(
					"w-full rounded transition-all text-white border border-gray-400 hover:border-gray-400/50 bg-[#121212] px-2 py-1 text-sm",
					props.class
				)}
				{...props}
			/>
			{props.hint && <Hint>{props.hint}</Hint>}
		</div>
	)
}