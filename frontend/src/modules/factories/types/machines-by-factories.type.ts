
export type MachinesByFactory = {
  id: number
  name: string
  model: string | null
  manufacturer: string | null
  description: string | null
  total_registries: number
  total_value: number
  last_registry_at: string
  created_at: string
  updated_at: string
}