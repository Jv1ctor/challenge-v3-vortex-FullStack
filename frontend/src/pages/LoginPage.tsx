import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../components/ui/input-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { EyeIcon, EyeOffIcon, User } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
function LoginPage() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const handleShowPassword = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <div className="flex min-h-svh items-center justify-center">
            <Card className="w-full max-w-md border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl">Bem vindo</CardTitle>
                <CardDescription>
                  Insira suas credenciais para acessar o painel de controle
                </CardDescription>
              </CardHeader>

              <CardContent className="mb-2">
                <form>
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
                          <Separator
                            orientation="vertical"
                            className="!h-5 !w-0.5"
                          />
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
                        <Separator
                          orientation="vertical"
                          className="!h-5 !w-0.5"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            onClick={handleShowPassword}
                            size="icon-sm"
                          >
                            {isVisible ? (
                              <EyeIcon className="size-5" strokeWidth={2.5} />
                            ) : (
                              <EyeOffIcon
                                className="size-5"
                                strokeWidth={2.5}
                              />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col mt-4">
                <Button type="submit" className="w-full">
                  Entra
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="min-h-svh bg-primary-foreground bg-[url('./assets/background.png')] bg-cover bg-no-repeat bg-center bg-blend-multiply flex flex-col items-end justify-end py-10 px-4">
          <h1 className="text-white text-3xl text-end mb-10">"Otimizando o consumo industrial através de dados precisos e monitoramento"</h1>
          <h4 className="text-gray-300 text-sm">Painel de Controle</h4>
        </div>
      </div>
    </>
  )
}

export default LoginPage
