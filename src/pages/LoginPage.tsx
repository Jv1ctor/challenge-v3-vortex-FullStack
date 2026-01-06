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
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

function LoginPage() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const handleShowPassword = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your user name below to login to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="mb-2">
            <form>
              <div className="flex flex-col gap-10 p-1.5 ">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name:</Label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password:</Label>
                  <InputGroup>
                    <InputGroupInput
                      type={ isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton onClick={handleShowPassword}>
                        {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default LoginPage
