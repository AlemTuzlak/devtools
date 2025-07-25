import { createSignal } from "solid-js"
import { Checkbox } from "../components/checkbox"
import { Input } from "../components/input"
import { SelectWithOptions } from "../components/select"
import { Stack } from "../components/stack"
import { useSettingsContext } from "../context/use-devtools-shell-context"

export const SettingsTab = () => {
	const { settings, setSettings } = useSettingsContext()
	const [minHeight, setMinHeight] = createSignal(settings().minHeight.toString())
	const [maxHeight, setMaxHeight] = createSignal(settings().maxHeight.toString())
	const [expansionLevel, setExpansionLevel] = createSignal(settings().expansionLevel.toString())
	const [openHotkey, setOpenHotkey] = createSignal(settings().openHotkey.toString())

	return (
		<Stack class="mb-4 px-5 p-2">
			<h1>
				<span class="text-lg font-semibold">Settings</span>
				<hr class="mt-2 border-gray-400" />
			</h1>
			<Checkbox
				id="defaultOpen"
				hint="The dev tools will be open by default when you run the application and when you refresh the browser."
				onChange={() => setSettings({ defaultOpen: !settings().defaultOpen })}
				value={settings().defaultOpen}
			>
				Open dev tools by default
			</Checkbox>
			<Checkbox
				id="requireUrlFlag"
				hint={`Allows you to only show rdt when there is a flag in the URL search params set. (${settings().urlFlag}=true)`}
				onChange={() => setSettings({ requireUrlFlag: !settings().requireUrlFlag })}
				value={settings().requireUrlFlag}
			>
				Show dev tools only when URL flag is set ?{settings().urlFlag}=true
			</Checkbox>
			<Checkbox
				id="hideUntilHover"
				hint="The dev tools trigger will be hidden on the page until you hover over it."
				onChange={() => setSettings({ hideUntilHover: !settings().hideUntilHover })}
				value={settings().hideUntilHover}
			>
				Hide the trigger until hovered
			</Checkbox>

			<hr class="mt-2 border-gray-700" />
			<Stack gap="lg">
				{settings().requireUrlFlag && (
					<Input
						name="urlFlag"
						id="urlFlag"
						label="URL flag to use"
						hint="This allows you to change the URL search param flag that will be used to show the dev tools when 'Show dev tools only when URL flag is set' is set to true"
						value={settings().urlFlag}
						onChange={(e) => setSettings({ urlFlag: e.target.value ?? "" })}
						onBlur={(e) => {
							setSettings({ urlFlag: e.target.value.trim() })
						}}
					/>
				)}

				<Input
					name="expansionLevel"
					id="expansionLevel"
					label="Depth of expansion for JSON objects"
					hint="This allows you to change the depth of expanded properties of json objects."
					value={expansionLevel()}
					onChange={(e) => setExpansionLevel(e.target.value ?? "")}
					onBlur={(e) => {
						const value = Number.parseInt(e.target.value)
						if (value && !Number.isNaN(value) && value >= 0) {
							setSettings({ expansionLevel: value })
						}
					}}
				/>
				<Input
					name="openHotkey"
					id="openHotkey"
					label="Hotkey to open/close development tools"
					hint="This allows you to change the default hotkey used to open development tools."
					value={openHotkey()}
					onChange={(e) => setOpenHotkey(e.target.value ?? "")}
					onBlur={(e) => {
						const value = e.target.value
						if (value) {
							setSettings({ openHotkey: value })
						}
					}}
				/>
				<div class="flex flex-col gap-2 lg:flex-row">
					<Input
						name="minHeight"
						label="Min height of the dev tools (px)"
						hint="The dev tools will not shrink below this height when being dragged."
						id="minHeight"
						value={minHeight()}
						onChange={(e) => setMinHeight(e.target.value ?? "")}
						onBlur={(e) => {
							const value = Number.parseInt(e.target.value)
							if (value && !Number.isNaN(value) && value < settings().maxHeight && value > 100) {
								setSettings({ minHeight: value })
							}
						}}
					/>
					<Input
						name="maxHeight"
						id="maxHeight"
						label="Max height of the dev tools (px)"
						hint="The dev tools will not expand beyond this height when being dragged."
						value={maxHeight()}
						onChange={(e) => setMaxHeight(e.target.value ?? "")}
						onBlur={(e) => {
							const value = Number.parseInt(e.target.value)
							if (value && !Number.isNaN(value) && value > settings().minHeight) {
								setSettings({ maxHeight: value })
							}
						}}
					/>
				</div>

				<div class="flex flex-col gap-2 lg:flex-row">
					<SelectWithOptions
						label="Trigger position"
						onSelect={(value) => setSettings({ position: value })}
						value={settings().position}
						class="w-full"
						options={[
							{ label: "Bottom Right", value: "bottom-right" },
							{ label: "Bottom Left", value: "bottom-left" },
							{ label: "Top Right", value: "top-right" },
							{ label: "Top Left", value: "top-left" },
							{ label: "Middle Right", value: "middle-right" },
							{ label: "Middle Left", value: "middle-left" },
						]}
						hint="This will determine where your trigger position on the screen is when the tools are collapsed."
					/>

					<SelectWithOptions
						label="Panel position"
						onSelect={(value) => setSettings({ panelLocation: value })}
						value={settings().panelLocation}
						class="w-full"
						options={[
							{ label: "Top", value: "top" },
							{ label: "Bottom", value: "bottom" },
						]}
						hint="This will determine where your panel shows up once opened"
					/>
				</div>
			</Stack>
		</Stack>
	)
}