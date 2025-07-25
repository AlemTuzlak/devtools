import { Show } from "solid-js"

interface CheckboxProps {
	onChange?: (e: Event) => void
	id: string
	children: any
	value?: boolean
	hint?: string
}

const Checkbox = (props: CheckboxProps) => {
	return (
		<div>
			<label class="text-md cursor-pointer" for={props.id}>
				<div class="flex items-center gap-2 py-1">
					<input
						value={props.value ? "checked" : undefined}
						checked={props.value}
						onChange={props.onChange}
						id={props.id}
						type="checkbox"
					/>
					{props.children}
				</div>
			</label>
			<Show when={props.hint}>
				<p class="text-sm text-gray-500">{props.hint}</p>
			</Show>
		</div>
	)
}

export { Checkbox }