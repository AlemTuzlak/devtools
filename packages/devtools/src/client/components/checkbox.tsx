import { createSignal, JSX } from "solid-js"

interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	onChange?: (checked: boolean) => void
	id: string
	children: JSX.Element
	value?: boolean
	hint?: string
}

const Checkbox = (props: CheckboxProps) => {
	const [checked, setChecked] = createSignal(props.value || false)

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		const newChecked = target.checked
		setChecked(newChecked)
		props.onChange?.(newChecked)
	}

	return (
		<div>
			<label class="text-md cursor-pointer" for={props.id}>
				<div class="flex items-center gap-2 py-1">
					<input
						checked={checked()}
						onChange={handleChange}
						id={props.id}
						type="checkbox"
						{...props}
					/>
					{props.children}
				</div>
			</label>
			{props.hint && <p class="text-sm text-gray-500">{props.hint}</p>}
		</div>
	)
}

export { Checkbox }