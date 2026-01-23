export type MessageError = {
  field: string
  errors: string[]
}

export type ResponseErrors = {
  message: string | MessageError[]
  error: string
  statusCode: number
}

function isMessageError(obj: any): obj is MessageError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.field === "string" &&
    Array.isArray(obj.errors) &&
    obj.errors.every((e: unknown) => typeof e === "string")
  )
}

export function isResponseErrors(obj: any): obj is ResponseErrors {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.error === "string" &&
    typeof obj.statusCode === "number" &&
    (typeof obj.message === "string" ||
      (Array.isArray(obj.message) && obj.message.every(isMessageError)))
  )
}
