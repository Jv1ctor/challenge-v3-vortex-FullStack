import { TableData } from "@/components/TableData"
import { Button } from "@/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Cog, SquarePen, Users } from "lucide-react"
import { NavLink, useLoaderData } from "react-router"
import type { Factories } from "./types/factories.type"

export const TableFactories = () => {
  const data = useLoaderData() as Factories[]
  console.log(data)
  return (
    <>
      <TableData
        title="Listagem das Unidades"
        buttonLabel="Cadastrar Fabrica"
        tableCaption="Listagem das Unidades"
        tableRowHeader={
          <TableRow>
            <TableHead className="text-muted-foreground uppercase">
              Nome da fabrica
            </TableHead>
            <TableHead className="text-muted-foreground uppercase">
              Localização
            </TableHead>
            <TableHead className="text-center text-muted-foreground uppercase">
              Quantidade de Maquinas
            </TableHead>
            <TableHead className="text-center text-muted-foreground uppercase">
              Quantidade de Operadores
            </TableHead>
            <TableHead className="p-5 text-muted-foreground text-right uppercase">
              Ações
            </TableHead>
          </TableRow>
        }
        tableRowBody={data.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.name}</TableCell>
            <TableCell className="align-top max-w-md">
              <div className="whitespace-normal wrap-break-word">
                {it.address && it.city && it.country
                  ? `${it.address}, ${it.city} - ${it.country}`
                  : ""}
              </div>
            </TableCell>
            <TableCell className="text-center">{it.count_machines}</TableCell>
            <TableCell className="text-center">{it.count_users}</TableCell>
            <TableCell>
              <div className="flex gap-5 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink to={`${it.id}/machines`} end>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <Cog />
                      </Button>
                    </NavLink>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Visualizar Maquinas desta fabrica</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      <Users />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualizar Usuarios da Fabrica</p>
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
                    <p>Editar Fabrica</p>
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
