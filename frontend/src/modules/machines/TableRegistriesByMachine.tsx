import { TableData } from "@/components/TableData"
import { Button } from "@/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useLoaderData } from "react-router"
import type { Registries } from "./types/registries.type"
import { SquarePen } from "lucide-react"

export const TableRegistriesByMachine = () => {
  const data = useLoaderData() as Registries[]

  return (
    <>
      <TableData
        title="Listagem de Registros da {MAQUINA}"
        tableCaption="Listagem dos Registros"
        tableRowHeader={
          <TableRow>
            <TableHead className="text-muted-foreground uppercase">
              Valor(kWh)
            </TableHead>
            <TableHead className="text-muted-foreground uppercase">
              Data de Registro
            </TableHead>
            <TableHead className="text-center text-muted-foreground uppercase">
              Inserido por
            </TableHead>
            <TableHead className="p-5 text-muted-foreground text-right uppercase">
              Ações
            </TableHead>
          </TableRow>
        }
        tableRowBody={data.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.value.toFixed(2)} kWh</TableCell>
            <TableCell>
              {it.createdAt}
            </TableCell>
            <TableCell className="text-center">{it.user.name}</TableCell>
            <TableCell>
              <div className="flex gap-5 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      <SquarePen />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar Registro</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      />
    </>
  )
}
