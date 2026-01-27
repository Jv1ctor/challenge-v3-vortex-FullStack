import { TableData } from "@/shared/components/TableData"
import { Button } from "@/shared/components/ui/button"
import { TableCell, TableHead, TableRow } from "@/shared/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { SquarePen, Trash2 } from "lucide-react"
import { useLoaderData, useRevalidator } from "react-router"
import type { UsersByFactories } from "./types/users-by-factories.type"
import { useHandleFormTable } from "@/shared/hooks/handle-form-table.hooks"
import type { UserFormData } from "./schemas/users.schema"
import { FormUser } from "./forms/FormUser"
import { useAuth } from "../auth/hooks/auth.hook"
import { FactoriesService } from "./services/factories.service"

export const TableUserByFactory = () => {
  const data = useLoaderData() as UsersByFactories
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
  } = useHandleFormTable<UserFormData>()

  const handleSubmit = async (formData: UserFormData) => {
    if (!token) return
    const result = await FactoriesService.createUserInFactory(
      token,
      data.id,
      formData,
    )

    if (result) {
      revalidate()
      closeForm()
    }
  }

  const handleEditSubmit = async (formData: UserFormData) => {
    if (!token) return
    if (!idRef || typeof idRef !== "string") return
    const result = await FactoriesService.updateUserInFactory(token, {
      user_id: idRef,
      password: formData.password,
    })

    if (result) {
      revalidate()
      closeForm()
    }
  }

  const handleDelete = async (userId: string) => {
    if (!token) return
    const result = await FactoriesService.deleteUser(token, userId)

    if (result) {
      revalidate()
    }
  }

  return (
    <>
      <TableData
        title={`Listagem de Operadores na ${data.name}`}
        tableCaption="Listagem de Operadores"
        buttonLabel="Cadastrar Usuario"
        openSheet={open}
        onOpenSheet={setOpen}
        setForms={() => openCreateForm()}
        sheetContent={
          activeForm && (
            <FormUser
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
        tableRowBody={data.data.map((it) => (
          <TableRow key={it.id}>
            <TableCell>{it.name}</TableCell>
            <TableCell>{it.total_registries}</TableCell>
            <TableCell>{it.last_registry_at ?? "sem registro"}</TableCell>
            <TableCell>
              <div className="flex gap-5 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        openEditForm(
                          {
                            username: it.name,
                            password: "",
                          },
                          it.id,
                        )
                      }}
                      className="bg-muted text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      <SquarePen />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar Operador</p>
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
                    <p>Deletar Usuario</p>
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
