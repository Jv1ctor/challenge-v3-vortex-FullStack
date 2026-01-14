import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState, type FormEvent } from "react"
import { EyeIcon, EyeOffIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./hooks/auth.hook"
import { useNavigate } from "react-router"

export const LoginFormCard = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const { token, login } = useAuth()
  const navigation = useNavigate()

  const handleShowPassword = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    if (token === undefined) return;
    
    if (!token) {
      console.error("FAILED LOGIN")
      return
    }

    console.info("LOGIN IS SUCCESS")
    navigation("/", { replace: true })
  }, [token])

  const handleLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name.length <= 0 || password.length <= 0) {
      console.error("NAME OR PASSWORD INVALID")
      return
    }

    await login(name, password)
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-md border-0 shadow-none xl:max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Bem vindo</CardTitle>
          <CardDescription>
            Insira suas credenciais para acessar o painel de controle
          </CardDescription>
        </CardHeader>

        <CardContent className="mb-2">
          <form id="login-form" onSubmit={handleLoginForm}>
            <div className="flex flex-col gap-10 p-1.5 ">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Usuario:</Label>
                <InputGroup className="py-5">
                  <InputGroupInput
                    type="text"
                    placeholder="Insira seu nome de usuario"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <InputGroupAddon align="inline-end">
                    <Separator orientation="vertical" className="h-5! w-0.5!" />
                    <User className="size-5" strokeWidth={2.5} />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha:</Label>
                <InputGroup className="py-5">
                  <InputGroupInput
                    type={isVisible ? "text" : "password"}
                    placeholder="Insira sua senha"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Separator orientation="vertical" className="h-5! w-0.5!" />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={handleShowPassword}
                      size="icon-sm"
                    >
                      {isVisible ? (
                        <EyeIcon className="size-5" strokeWidth={2.5} />
                      ) : (
                        <EyeOffIcon className="size-5" strokeWidth={2.5} />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col mt-4">
          <Button type="submit" form="login-form" className="w-full">
            Entra
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
