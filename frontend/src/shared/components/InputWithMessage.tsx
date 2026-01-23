import { Label } from "@/shared/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group"
import type { ChangeEvent, ReactNode } from "react"

type Props = {
  label: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  addons?: ReactNode
}

export const InputWithMessage = ({
  label,
  name,
  value,
  onChange,
  addons,
}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor={name}>{label}</Label>
        <InputGroup className="py-5">
          <InputGroupInput
            type="text"
            placeholder="Insira seu nome de usuario"
            name={name}
            id={name}
            value={value}
            onChange={onChange}
          />

          <InputGroupAddon align="inline-end">{addons}</InputGroupAddon>
        </InputGroup>
      </div>
    </>
  )
}
