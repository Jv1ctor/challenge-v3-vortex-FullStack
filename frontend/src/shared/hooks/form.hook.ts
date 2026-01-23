import { useState } from "react"
import type z from "zod"
import { ZodError } from "zod"
import { isResponseErrors } from "../types/response-errors.type"

type Params<T> = {
  initialData: T
  schemaObject: z.ZodType<T>
  onSubmit: (arg: T) => Promise<void> | void
}

export const useForm = <T>({
  initialData,
  schemaObject,
  onSubmit,
}: Params<T>) => {
  const [formData, setFormData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fetchError, setFetchError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const validatedData = schemaObject.parse(formData)
      setErrors({})
      await onSubmit(validatedData)
      setFormData(initialData)
    } catch (error) {
      
      if(isResponseErrors(error)){
        if(typeof error.message === "string"){
          setFetchError(error.message)
          return
        }        
        const newErrors: Record<string, string> = {}
        error.message.forEach( it => { 
          it.errors.forEach( e => {
            newErrors[it.field] = e
          })
        })
        setErrors(newErrors)
      }

      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {}
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[String(issue.path[0])] = issue.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  const handleChange = (field: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFetchError("")

    if (errors[String(field)]) {
      setErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _, ...rest } = prev
        return rest
      })
    }
  }

  return { formData, handleSubmit, handleChange, errors, fetchError}
}
