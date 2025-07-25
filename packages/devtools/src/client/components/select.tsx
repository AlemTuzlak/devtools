import { Select } from "@kobalte/core"
import { For, Show } from "solid-js"
import { Hint, Label } from "./input"
import { Stack } from "./stack"

const SelectWithOptions = <T extends string>(props: {
	placeholder?: string
	value?: T
	label?: string
	hint?: string
	options: { value: T; label: string }[]
	onSelect: (value: T) => void
	class?: string
}) => {
	return (
		<Stack class={props.class} gap="sm">
			<Show when={props.label}>
				<Label>{props.label}</Label>
			</Show>
			<Select.Root value={props.value} onChange={props.onSelect}>
				<Select.Trigger class="hover:border-gray-400/50 transition-all ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-full items-center justify-between rounded-md border border-gray-400 bg-[#121212] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
					<Select.Value placeholder={props.placeholder} />
					<Select.Icon>
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
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content class="relative z-[9999] min-w-[8rem] overflow-hidden rounded-md border border-solid border-[#121212] bg-popover text-popover-foreground shadow-md">
						<Select.Listbox class="border border-gray-500 p-1">
							<For each={props.options}>
								{(option) => (
									<Select.Item
										value={option.value}
										class="focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-sans text-sm outline-none hover:cursor-pointer hover:bg-[#121212] focus:bg-[#121212] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
									>
										<Select.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
										</Select.ItemIndicator>
										<Select.ItemLabel>{option.label}</Select.ItemLabel>
									</Select.Item>
								)}
							</For>
						</Select.Listbox>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
			<Show when={props.hint}>
				<Hint>{props.hint}</Hint>
			</Show>
		</Stack>
	)
}

export { SelectWithOptions }