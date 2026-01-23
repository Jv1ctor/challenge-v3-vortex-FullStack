import { Label } from "@/shared/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group"
import { Separator } from "@/shared/components/ui/separator"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

type Props = {
  value: string
  setValue: (value: string) => void
  isError?: boolean
}

export const InputPasswordWithMessage = ({
  value,
  setValue,
  isError = false,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleShowPassword = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Senha:</Label>
        <InputGroup className="py-5">
          <InputGroupInput
            type={isVisible ? "text" : "password"}
            placeholder="Insira sua senha"
            name="password"
            id="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Separator orientation="vertical" className="h-5! w-0.5!" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={handleShowPassword} size="icon-sm">
              {isVisible ? (
                <EyeIcon className="size-5" strokeWidth={2.5} />
              ) : (
                <EyeOffIcon className="size-5" strokeWidth={2.5} />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {isError && (
          <p className="text-xs ml-3 text-destructive">
            Usuario ou Senha invalidos
          </p>
        )}
      </div>
    </>
  )
}
