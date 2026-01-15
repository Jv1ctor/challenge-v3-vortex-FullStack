import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./hooks/auth.hook"
import { useNavigate } from "react-router"
import { InputPasswordWithMessage } from "@/components/InputPasswordWithMessage"
import { User } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { InputWithMessage } from "@/components/InputWithMessage"

export const LoginFormCard = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)

  const { token, login, error, isLoading } = useAuth()
  const navigation = useNavigate()

  useEffect(() => {
    if (error) setIsError(error)

    if (!token) {
      return
    }

    console.info("LOGIN IS SUCCESS")
    navigation("/", { replace: true })
  }, [token, error])

  useEffect(() => {
    setIsError(false)
  }, [name, password])

  const handleLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name.length <= 0 || password.length <= 0) {
      console.error("NAME OR PASSWORD INVALID")
      setIsError(true)
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
              <InputWithMessage
                label="Usuario:"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                addons={
                  <>
                    <Separator orientation="vertical" className="h-5! w-0.5!" />
                    <User className="size-5" strokeWidth={2.5} />
                  </>
                }
              />
              <InputPasswordWithMessage
                value={password}
                setValue={setPassword}
                isError={isError}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col mt-4 px-44">
          <Button type="submit" form="login-form" className="w-full">
            {isLoading ? <Spinner className="size-6" /> : "Entrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
