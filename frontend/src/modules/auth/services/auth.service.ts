type LoginData = {
  username: string
  password: string
}

type ResponseApiLogin = {
  access_token: string
  name: string
}

export const loginRequest = async (data: LoginData) => {
  try {
    const body = JSON.stringify({
      username: data.username,
      password: data.password,
    })

    const response = await fetch("http://localhost:4000/api/auth/web/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`RESPONSE STATUS: ${response.status}`)
    }

    const result: ResponseApiLogin = await response.json()
    return { accessToken: result.access_token, username: result.name }
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return null
  }
}
