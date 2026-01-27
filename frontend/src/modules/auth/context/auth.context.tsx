import { createContext, useState, type ReactNode } from "react"
import { loginRequest } from "../services/auth.service"

type AuthContextData = {
  token: string | null | undefined
  username: string | null | undefined
  isLoading: boolean
  error: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token")
  })
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("username")
  })
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    const resultToken = await loginRequest({ username, password })

    if (!resultToken) {
      setIsLoading(false)
      setError(true)
      console.error("REQUEST_FAILED")
      return
    }

    localStorage.setItem("token", resultToken.accessToken)
    localStorage.setItem("username", resultToken.username)
    setToken(resultToken.accessToken)
    setUsername(resultToken.username)
    setIsLoading(false)
  }

  const logout = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setToken(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        error,
        login,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
