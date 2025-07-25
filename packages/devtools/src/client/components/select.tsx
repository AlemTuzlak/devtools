import { createSignal, For, Show } from "solid-js"
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
	const [isOpen, setIsOpen] = createSignal(false)
	
	const selectedOption = () => props.options.find(opt => opt.value === props.value)
	
	const handleSelect = (value: T) => {
		props.onSelect(value)
		setIsOpen(false)
	}

	return (
		<Stack class={props.class} gap="sm">
			<Show when={props.label}>
				<Label>{props.label}</Label>
			</Show>
			<div class="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen())}
					class="hover:border-gray-400/50 transition-all ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-full items-center justify-between rounded-md border border-gray-400 bg-[#121212] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<span class="text-left">
						{selectedOption()?.label || props.placeholder}
					</span>
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
				</button>
				<Show when={isOpen()}>
					<div class="absolute top-full left-0 right-0 z-[9999] mt-1 min-w-[8rem] overflow-hidden rounded-md border border-solid border-[#121212] bg-popover text-popover-foreground shadow-md">
						<div class="border border-gray-500 p-1">
							<For each={props.options}>
								{(option) => (
									<button
										type="button"
										onClick={() => handleSelect(option.value)}
										class="focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-sans text-sm outline-none hover:cursor-pointer hover:bg-[#121212] focus:bg-[#121212] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
									>
										<Show when={props.value === option.value}>
											<div class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
											</div>
										</Show>
										<span>{option.label}</span>
									</button>
								)}
							</For>
						</div>
					</div>
				</Show>
			</div>
			<Show when={props.hint}>
				<Hint>{props.hint}</Hint>
			</Show>
		</Stack>
	)
}

export { SelectWithOptions }