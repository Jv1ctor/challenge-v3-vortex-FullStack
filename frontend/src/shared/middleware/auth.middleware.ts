import { jwtDecode } from "jwt-decode";
import { createContext, redirect, type MiddlewareFunction } from "react-router";


type JwtPayload = {
  id: string;
  exp: number;
};

type User = {
  id: string
}

const userContext = createContext<User>()

export const authMiddleware: MiddlewareFunction = async ({ context }) => {
    const token = localStorage.getItem("token")

    if(!token){
      throw redirect("/login")
    }
    
    const decode = jwtDecode<JwtPayload>(token)

    context.set(userContext, { id: decode.id })
}