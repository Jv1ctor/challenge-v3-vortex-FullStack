import { createContext, useEffect, useState, type ReactNode } from "react"
import { loginRequest } from "../services/auth.service"

type AuthContextData = {
  token: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect( () => {
    const token = localStorage.getItem("token") 
    if(!token) return 
    setToken(token)
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    const resultToken = await loginRequest({ username, password})
    
    if(!resultToken) {
      setIsLoading(false)
      console.error("REQUEST_FAILED")
      return
    }

    localStorage.setItem("token", resultToken)
    setToken(resultToken)
    setIsLoading(false)
  }

  const logout = async () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ 
      token,
      login,
      isLoading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}


