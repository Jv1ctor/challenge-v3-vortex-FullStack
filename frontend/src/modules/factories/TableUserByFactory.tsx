import { TableData } from "@/components/TableData"
import { Button } from "@/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SquarePen } from "lucide-react"
import { useLoaderData } from "react-router"
import type { UsersByFactories } from "./types/users-by-factories.type"

export const TableUserByFactory = () => {
  const data = useLoaderData() as UsersByFactories[]

  return (
    <>
      <TableData
        title={"Listagem de Operadores na {FABRICA}"}
        tableCaption="Listagem de Operadores"
        tableRowHeader={
          <>
            <TableRow>
              <TableHead className="text-muted-foreground uppercase">
                Nome do Usuario
              </TableHead>
              <TableHead className="text-muted-foreground uppercase">
                Total de registros
              </TableHead>
              <TableHead className="text-muted-foreground uppercase">
                Ultimo Registro
              </TableHead>
              <TableHead className="p-5 text-muted-foreground text-right uppercase">
                Ações
              </TableHead>
            </TableRow>
          </>
        }
        tableRowBody={data.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.name}</TableCell>
            <TableCell>{it.total_registries}</TableCell>
            <TableCell>{it.last_registry_at}</TableCell>
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
                    <p>Editar Operador</p>
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
