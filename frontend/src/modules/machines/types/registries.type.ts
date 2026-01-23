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
