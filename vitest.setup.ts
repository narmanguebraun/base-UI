import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { toHaveNoViolations } from "jest-axe"
import { afterEach, expect } from "vitest"

expect.extend(toHaveNoViolations)

// RTL does not auto-cleanup without Vitest globals — register it explicitly
afterEach(cleanup)
