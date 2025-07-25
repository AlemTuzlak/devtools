// This is your packages entry point, everything exported from here will be accessible to the end-user.
import { Shell as Primitive } from "./client/shell"

const Shell = typeof window !== "undefined" ? Primitive : () => null
export { Shell }
