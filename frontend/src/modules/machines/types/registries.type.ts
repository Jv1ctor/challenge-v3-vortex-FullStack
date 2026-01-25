export type Registries = {
  id: number
  value: number
  createdAt: string
  user: {
    id: string
    name: string
    isAdmin: boolean
  }
}

export type RegistriesByMachine = {
  id: number
  name: string
  description: string
  manufacturer: string
  model: string
  data: Registries[]
}
