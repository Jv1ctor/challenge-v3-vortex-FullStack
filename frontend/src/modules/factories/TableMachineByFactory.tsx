import { TableData } from "@/shared/components/TableData"
import { Button } from "@/shared/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/shared/components/ui/table"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { NotebookPen, SquarePen } from "lucide-react"
import { NavLink, useLoaderData, useRevalidator } from "react-router"
import type { MachinesByFactory } from "./types/machines-by-factories.type"
import { FormMachine } from "./forms/FormMachine"
import type { MachineFormData } from "./schemas/machine.schema"
import { FormSheet } from "@/shared/components/sheet/FormSheet"
import { useHandleFormTable } from "@/shared/hooks/handle-form-table.hooks"
import { SheetTrigger } from "@/shared/components/ui/sheet"
import { useAuth } from "../auth/hooks/auth.hook"
import { FactoriesService } from "./services/factories.service"

export const TableMachineByFactory = () => {
  const data = useLoaderData() as MachinesByFactory
  const { revalidate } = useRevalidator()
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

  const handleSubmit = async (formData: MachineFormData) => {
    // TODO: mensagem informando que aconteceu algum erro ou redirect para login.
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
    if (!idRef) return
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
          activeForm === "create" ? (
            <FormSheet
              formRef="machine-form"
              formContent={<FormMachine onSubmit={handleSubmit} />}
              buttonContent="Cadastrar Máquina"
              title="Nova Máquina"
              description="Preencha os dados para cadastrar uma nova máquina"
            />
          ) : activeForm === "edit" ? (
            <FormSheet
              formRef="machine-form"
              formContent={
                <FormMachine
                  onSubmit={handleEditSubmit}
                  initialData={selectedData}
                />
              }
              buttonContent="Salvar"
              title="Editar Máquina"
              description="Preencha os dados para editar a máquina escolhida"
            />
          ) : null
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
            <TableCell>{it.name}</TableCell>
            <TableCell>{it.model || ""}</TableCell>
            <TableCell>{it.manufacturer || ""}</TableCell>
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      />
    </>
  )
}
