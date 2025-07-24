import * as SelectPrimitive from "@radix-ui/react-select"
import { Hint, Label } from "./input"
import { Stack } from "./stack"
import { cn } from "./util"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const SelectTrigger = ({ className, children, ref, ...props }: SelectPrimitive.SelectTriggerProps & { ref?: any }) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"hover:border-gray-400/50 transition-all ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-full items-center justify-between rounded-md border border-gray-400 bg-[#121212] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				className="h-4 w-4 opacity-50"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
)

const SelectContent = ({
	className,
	children,
	position = "popper",
	ref,
	...props
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: SelectPrimitive.SelectContentProps & { ref?: any }) => {
	return (
		// @ts-ignore
		<SelectPrimitive.Portal className="tanstack-dev-tools">
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					"relative z-[9999] min-w-[8rem] overflow-hidden rounded-md border border-solid border-[#121212] bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className
				)}
				position={position}
				{...props}
			>
				<SelectPrimitive.Viewport
					className={cn(
						"border border-gray-500 p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const SelectLabel = ({ className, ref, ...props }: SelectPrimitive.SelectLabelProps & { ref?: any }) => (
	<SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 font-sans text-sm", className)} {...props} />
)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const SelectItem = ({ className, children, ref, ...props }: SelectPrimitive.SelectItemProps & { ref?: any }) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 font-sans text-sm outline-none hover:cursor-pointer hover:bg-[#121212] focus:bg-[#121212] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					className="h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			</SelectPrimitive.ItemIndicator>
		</span>

		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
)

const SelectWithOptions = <T extends string>({
	placeholder,
	label,
	options,
	onSelect,
	hint,
	value,
	className,
}: {
	placeholder?: string
	value?: T
	label?: string
	hint?: string
	options: { value: T; label: string }[]
	onSelect: (value: T) => void
	className?: string
}) => {
	return (
		<Stack className={className} gap="sm">
			{label && <Label>{label}</Label>}
			<Select
				onOpenChange={() => {
					const el = document.querySelector("div[data-radix-popper-content-wrapper]")
					el?.setAttribute("class", "tanstack-dev-tools")
				}}
				value={value}
				onValueChange={onSelect}
			>
				<SelectTrigger className="w-full text-white">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{label}</SelectLabel>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{hint && <Hint>{hint}</Hint>}
		</Stack>
	)
}

export { SelectWithOptions }
