import { TableData } from "@/components/TableData"
import { Button } from "@/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Tooltip } from "@/components/ui/tooltip"
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { NotebookPen, SquarePen } from "lucide-react"
import { NavLink, useLoaderData } from "react-router"
import type { MachinesByFactory } from "./types/machines-by-factories.type"

export const TableMachineByFactory = () => {
  const data = useLoaderData() as MachinesByFactory[]
  return (
    <>
      <TableData
        title="Listagem das Maquinas na Fabrica 01"
        buttonLabel="Cadastrar Maquina"
        tableCaption="Listagem das Unidades"
        tableRowHeader={
          <>
            <TableRow>
              <TableHead className="text-muted-foreground uppercase">
                Nome da Maquina
              </TableHead>
              <TableHead className="text-muted-foreground uppercase">
                Modelo
              </TableHead>
              <TableHead className="text-muted-foreground uppercase">
                Fabricante
              </TableHead>
              <TableHead className="text-center text-muted-foreground uppercase">
                Quantidade de Registros
              </TableHead>
              <TableHead className="text-muted-foreground uppercase">
                Criado em
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
            <TableCell>{it.model || ""}</TableCell>
            <TableCell>{it.manufacturer || ""}</TableCell>
            <TableCell className="text-center">{""}</TableCell>
            <TableCell>{it.createdAt}</TableCell>
            <TableCell>
              <div className="flex gap-5 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink to={`/machines/${it.id}/registries`} end>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <NotebookPen />
                      </Button>
                    </NavLink>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Visualizar Registro da Maquina</p>
                  </TooltipContent>
                </Tooltip>

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
                    <p>Editar Maquina</p>
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
