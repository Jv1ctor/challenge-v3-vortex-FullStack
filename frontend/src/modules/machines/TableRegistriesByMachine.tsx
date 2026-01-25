import { TableData } from "@/shared/components/TableData"
import { Button } from "@/shared/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/shared/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { useLoaderData, useRevalidator } from "react-router"
import type { RegistriesByMachine } from "./types/registries.type"
import { SquarePen } from "lucide-react"
import { SheetTrigger } from "@/shared/components/ui/sheet"
import { FormRegistry } from "./forms/FormRegistry"
import type { RegistryFormData } from "./schemas/registry.schema"
import { useHandleFormTable } from "@/shared/hooks/handle-form-table.hooks"
import { useAuth } from "../auth/hooks/auth.hook"
import { RegistriesService } from "./services/registries.service"

export const TableRegistriesByMachine = () => {
  const data = useLoaderData() as RegistriesByMachine
  const { revalidate } = useRevalidator()
  const { token } = useAuth()
  const {
    activeForm,
    closeForm,
    setOpen,
    open,
    idRef,
    openEditForm,
    selectedData,
  } = useHandleFormTable<RegistryFormData>()

  const handleEditSubmit = async (formData: RegistryFormData) => {
    if (!token) return
    if (!idRef || typeof idRef !== "number") return
    const result = await RegistriesService.updateRegistry(
      token,
      idRef,
      formData.value,
    )

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
        title={`Listagem de Registros da ${data.name}`}
        tableCaption="Listagem dos Registros"
        sheetContent={
          activeForm && (
            <FormRegistry
              initialData={selectedData}
              onSubmit={handleEditSubmit}
            />
          )
        }
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
        tableRowBody={data.data.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.value.toFixed(2)} kWh</TableCell>
            <TableCell>{it.createdAt}</TableCell>
            <TableCell className="text-center">{it.user.name}</TableCell>
            <TableCell>
              <div className="flex gap-5 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                      <Button
                        onClick={() =>
                          openEditForm(
                            {
                              value: it.value,
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
