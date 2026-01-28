import { TableData } from "@/shared/components/TableData"
import { Button } from "@/shared/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/shared/components/ui/table"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { NotebookPen, SquarePen, Trash2 } from "lucide-react"
import { NavLink, useLoaderData, useNavigation, useRevalidator } from "react-router"
import type { MachinesByFactory } from "./types/machines-by-factories.type"
import { FormMachine } from "./forms/FormMachine"
import type { MachineFormData } from "./schemas/machine.schema"
import { useHandleFormTable } from "@/shared/hooks/handle-form-table.hooks"
import { SheetTrigger } from "@/shared/components/ui/sheet"
import { useAuth } from "../auth/hooks/auth.hook"
import { FactoriesService } from "./services/factories.service"

export const TableMachineByFactory = () => {
  const data = useLoaderData() as MachinesByFactory
  const { revalidate } = useRevalidator()
  const { state } = useNavigation()
  const { token } = useAuth()
  const {
    activeForm,
    closeForm,
    open,
    idRef,
    setOpen,
    openCreateForm,
    openEditForm,
    selectedData,
  } = useHandleFormTable<MachineFormData>()

  const isLoading = state === "loading"
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">Carregando...</div>
    )
  }

  const handleSubmit = async (formData: MachineFormData) => {
    if (!token) return
    const result = await FactoriesService.createMachineInFactory(
      token,
      data.id,
      formData,
    )

    if (result) {
      revalidate()
      closeForm()
    }
  }

  const handleEditSubmit = async (formData: MachineFormData) => {
    if (!token) return
    if (!idRef || typeof idRef !== "number") return
    const result = await FactoriesService.updateMachineInFactory(
      token,
      data.id,
      idRef,
      formData,
    )

    if (result) {
      revalidate()
      closeForm()
    }
  }

  const handleDelete = async (machineId: number) => {
    if (!token) return
    const result = await FactoriesService.deleteMachine(token, machineId)

    if (result) {
      revalidate()
    }
  }

  return (
    <>
      <TableData
        openSheet={open}
        onOpenSheet={setOpen}
        setForms={() => openCreateForm()}
        title={`Listagem das Maquinas na ${data.name}`}
        buttonLabel="Cadastrar Maquina"
        tableCaption="Listagem das Unidades"
        sheetContent={
          activeForm && (
            <FormMachine
              type={activeForm}
              initialData={selectedData}
              onSubmit={
                activeForm === "create" ? handleSubmit : handleEditSubmit
              }
            />
          )
        }
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
              <TableHead className="text-center text-muted-foreground uppercase">
                Total de kWh
              </TableHead>
              <TableHead className="text-center text-muted-foreground uppercase">
                Ultimo Registro
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
        tableRowBody={data.data.map((it) => (
          <TableRow key={it.id}>
            <TableCell className="whitespace-normal wrap-break-word max-w-56">
              {it.name}
            </TableCell>
            <TableCell className="whitespace-normal wrap-break-word max-w-56">
              {it.model || ""}
            </TableCell>
            <TableCell className="whitespace-normal wrap-break-word max-w-56">
              {it.manufacturer || ""}
            </TableCell>
            <TableCell className="text-center">{it.total_registries}</TableCell>
            <TableCell className="text-center">
              {it.total_value.toFixed(2)}
            </TableCell>
            <TableCell className="text-center">{it.last_registry_at}</TableCell>
            <TableCell>{it.created_at}</TableCell>
            <TableCell>
              <div className="flex gap-5 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink to={`${it.id}/registries`} end>
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
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          openEditForm(
                            {
                              name: it.name,
                              description: it.description ?? "",
                              manufacturer: it.manufacturer ?? "",
                              model: it.model ?? "",
                            },
                            it.id,
                          )
                        }
                        className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <SquarePen />
                      </Button>
                    </SheetTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar Maquina</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleDelete(it.id)}
                      variant="ghost"
                      size="icon"
                      className="bg-transparent text-destructive border-2 border-destructive cursor-pointer hover:bg-destructive hover:text-white"
                    >
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Deletar Maquina</p>
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
