import type { MessageError } from "./response-errors.type"

export type ReturnServices<T> =
  | {
      success: true
      data: T | null
      error: null
    }
  | {
      success: false
      data: null
      error: string | MessageError[]
    }
