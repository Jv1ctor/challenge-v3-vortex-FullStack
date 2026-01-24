
type Users = {
  id: string,
  name: string,
  total_registries: number,
  last_registry_at: string | null

}

export type UsersByFactories = {
  id: number,
  name: string,
  data: Users[]
}