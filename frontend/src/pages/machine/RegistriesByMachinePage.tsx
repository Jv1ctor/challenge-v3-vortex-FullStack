import { TableRegistriesByMachine } from "@/modules/machines/TableRegistriesByMachine"
import { useLoaderData } from "react-router"


export const RegistriesByMachinePage = () => {
  const data = useLoaderData()

  console.log(data)
  return (
    <>
      <TableRegistriesByMachine />
    </>
  )
}
