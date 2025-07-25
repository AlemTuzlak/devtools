import { Select as KSelect } from "@kobalte/core/select"
import { createSignal, For, JSX } from "solid-js"
import { Hint, Label } from "./input"
import { Stack } from "./stack"
import { cn } from "./util"

const SelectWithOptions = <T extends string>(props: {
	placeholder?: string
	value?: T
	label?: string
	hint?: string
	options: { value: T; label: string }[]
	onSelect: (value: T) => void
	class?: string
}) => {
	const [value, setValue] = createSignal(props.value)

	const handleValueChange = (newValue: T) => {
		setValue(newValue)
		props.onSelect(newValue)
	}

	return (
		<Stack class={props.class} gap="sm">
			{props.label && <Label>{props.label}</Label>}
			<KSelect
				value={value()}
				onChange={handleValueChange}
				options={props.options}
				optionValue="value"
				optionTextValue="label"
				placeholder={props.placeholder}
				itemComponent={(itemProps) => (
					<KSelect.Item item={itemProps.item} class={cn(
						"focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-sans text-sm outline-none hover:cursor-pointer hover:bg-[#121212] focus:bg-[#121212] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					)}>
						<KSelect.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						</KSelect.ItemIndicator>
						<KSelect.ItemLabel>{itemProps.item.rawValue.label}</KSelect.ItemLabel>
					</KSelect.Item>
				)}
			>
				<KSelect.Trigger class={cn(
					"hover:border-gray-400/50 transition-all ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-full items-center justify-between rounded-md border border-gray-400 bg-[#121212] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
				)}>
					<KSelect.Value<{ value: T; label: string }>>{(state) => state.selectedOption().label}</KSelect.Value>
					<KSelect.Icon>
						<svg
							class="h-4 w-4 opacity-50"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</KSelect.Icon>
				</KSelect.Trigger>
				<KSelect.Portal>
					<KSelect.Content class={cn(
						"relative z-[9999] min-w-[8rem] overflow-hidden rounded-md border border-solid border-[#121212] bg-popover text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95"
					)}>
						<KSelect.Listbox class="border border-gray-500 p-1" />
					</KSelect.Content>
				</KSelect.Portal>
			</KSelect>
			{props.hint && <Hint>{props.hint}</Hint>}
		</Stack>
	)
}

export { SelectWithOptions }