import { ImageFormCard } from "@/modules/auth/ImageFormCard"
import { LoginFormCard } from "@/modules/auth/LoginFormCard"

function LoginPage() {

  return (
    <>
      <div className="grid grid-cols-2">
        <LoginFormCard />
        <ImageFormCard />
      </div>
    </>
  )
}

export default LoginPage
