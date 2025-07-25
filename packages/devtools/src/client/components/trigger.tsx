import { Show } from "solid-js"
import { usePersistOpen, useSettingsContext } from "../context/use-devtools-shell-context"
import { Logo } from "./logo"

export const Trigger = (props: {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}) => {
	const { settings } = useSettingsContext()
	const { setPersistOpen } = usePersistOpen()
	
	const handleHover = (e: MouseEvent, event: "enter" | "leave") => {
		if (!settings().hideUntilHover) return
		const target = e.currentTarget as HTMLButtonElement
		const classesToRemove = "opacity-0"
		const classesToAdd = "opacity-100"
		if (event === "enter") {
			target.classList.remove(classesToRemove)
			target.classList.add(classesToAdd)
		}
		if (event === "leave") {
			target.classList.remove(classesToAdd)
			target.classList.add(classesToRemove)
		}
	}

	const positionClasses = () => {
		const position = settings().position
		return {
			"bottom-0 right-0": position === "bottom-right",
			"bottom-0 left-0": position === "bottom-left",
			"right-0 top-0": position === "top-right",
			"left-0 top-0": position === "top-left",
			"right-0 top-1/2 -translate-y-1/2": position === "middle-right",
			"left-0 top-1/2 -translate-y-1/2": position === "middle-left",
		}
	}

	return (
		<Show when={!props.isOpen}>
			<button
				type="button"
				data-testid="react-router-devtools-trigger"
				style={{ "z-index": 9999 }}
				onClick={() => {
					props.setIsOpen(!props.isOpen)
					setPersistOpen(!props.isOpen)
				}}
				onMouseEnter={(e) => handleHover(e, "enter")}
				onMouseLeave={(e) => handleHover(e, "leave")}
				class={`fixed m-1.5 h-14 w-14 cursor-pointer bg-main flex items-center justify-center rounded-full transition-all hover:cursor-pointer hover:ring-2 hover:ring-offset-2 ring-[#212121] ${
					settings().hideUntilHover ? "opacity-0" : ""
				} ${Object.entries(positionClasses()).filter(([_, condition]) => condition).map(([className]) => className).join(" ")}`}
			>
				<Logo class="focus:outline-none w-full h-full rounded-full transition-all duration-200 overflow-visible" />
			</button>
		</Show>
	)
}