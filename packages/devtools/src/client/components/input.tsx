import { Show } from "solid-js"

interface InputProps {
	label?: string
	hint?: string
	name?: string
	id?: string
	value?: string
	onChange?: (
		e: Event & {
			currentTarget: HTMLInputElement
			target: HTMLInputElement
		}
	) => void
	onBlur?: (
		e: Event & {
			currentTarget: HTMLInputElement
			target: HTMLInputElement
		}
	) => void
	class?: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Label = (props: { class?: string; children: any; name?: string }) => {
	return (
		<label for={props.name} class={`block text-white text-sm ${props.class || ""}`}>
			{props.children}
		</label>
	)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const Hint = (props: { children: any }) => {
	return <p class="text-sm text-gray-500">{props.children}</p>
}

export const Input = (props: InputProps) => {
	return (
		<div class="flex w-full flex-col gap-1">
			<Show when={props.label}>
				<Label name={props.name}>{props.label}</Label>
			</Show>
			<input
				name={props.name}
				id={props.id}
				class={`w-full rounded transition-all text-white border border-gray-400 hover:border-gray-400/50 bg-[#121212] px-2 py-1 text-sm ${props.class || ""}`}
				value={props.value}
				onChange={(e) => props.onChange?.(e)}
				onBlur={props.onBlur}
			/>
			<Show when={props.hint}>
				<Hint>{props.hint}</Hint>
			</Show>
		</div>
	)
}
