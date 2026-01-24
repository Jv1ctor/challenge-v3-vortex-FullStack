import { TableData } from "@/shared/components/TableData"
import { Button } from "@/shared/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/shared/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { Cog, SquarePen, Users } from "lucide-react"
import { NavLink, useLoaderData, useRevalidator } from "react-router"
import type { Factories } from "./types/factories.type"
import { FormFactory } from "./forms/FormFactory"
import type { FactoryFormData } from "./schemas/factory.schema"
import { SheetTrigger } from "@/shared/components/ui/sheet"
import { useHandleFormTable } from "@/shared/hooks/handle-form-table.hooks"
import { FactoriesService } from "./services/factories.service"
import { useAuth } from "../auth/hooks/auth.hook"

export const TableFactories = () => {
  const data = useLoaderData() as Factories[]
  const { revalidate } = useRevalidator()
  const { token } = useAuth()
  const {
    activeForm,
    closeForm,
    setOpen,
    open,
    idRef,
    openCreateForm,
    openEditForm,
    selectedData,
  } = useHandleFormTable<FactoryFormData>()
  const handleSubmit = async (formData: FactoryFormData) => {
    if (!token) return
    const result = await FactoriesService.createFactory(token, formData)

    if (result) {
      revalidate()
      closeForm()
    }
  }

  const handleEditSubmit = async (formData: FactoryFormData) => {
    if (!token) return
    if (!idRef || typeof idRef !== "number") return
    const result = await FactoriesService.updateFactory(token, idRef, formData)

    if (result) {
      revalidate()
      closeForm()
    }
  }

  return (
    <>
      <TableData
        openSheet={open}
        onOpenSheet={setOpen}
        title="Listagem das Unidades"
        buttonLabel="Cadastrar Fabrica"
        setForms={() => openCreateForm()}
        tableCaption="Listagem das Unidades"
        sheetContent={
          activeForm && (
            <FormFactory
              type={activeForm}
              initialData={selectedData}
              onSubmit={
                activeForm === "create" ? handleSubmit : handleEditSubmit
              }
            />
          )
        }
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
            <TableCell className="max-w-md">
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
                    <NavLink to={`${it.id}/users`} end>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <Users />
                      </Button>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualizar Usuarios da Fabrica</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                      <Button
                        onClick={() =>
                          openEditForm(
                            {
                              address: it.address ?? "",
                              city: it.city ?? "",
                              country: it.country ?? "",
                              name: it.name,
                            },
                            it.id,
                          )
                        }
                        variant="ghost"
                        size="icon"
                        className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <SquarePen />
                      </Button>
                    </SheetTrigger>
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
