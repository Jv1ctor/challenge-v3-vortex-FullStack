import { InputPasswordWithMessage } from "@/shared/components/InputPasswordWithMessage"
import { Input } from "@/shared/components/ui/input"
import { useForm } from "@/shared/hooks/form.hook"
import { Label } from "@radix-ui/react-label"
import { userSchema, type UserFormData } from "../schemas/users.schema"
import { FormSheet } from "@/shared/components/sheet/FormSheet"

type Props = {
  onSubmit: (data: UserFormData) => void | Promise<void>
  initialData?: UserFormData | null
  type: "create" | "edit"
}

export const FormUser = ({ onSubmit, initialData, type }: Props) => {
  const configForm = {
    buttonContent: "Cadastrar",
    title: "Cadastro de operador",
    description: "Cadaste no operador nesta fabrica",
  }
  const { formData, handleChange, errors, handleSubmit, fetchError } =
    useForm<UserFormData>({
      initialData: initialData ?? {
        username: "",
        password: "",
      },
      onSubmit,
      schemaObject: userSchema,
    })

  if (type === "edit") {
    configForm.buttonContent = "Salvar"
    configForm.description = "Alterar senha de usuario"
    configForm.title = "Altere a senha do usuario"
  }

  return (
    <FormSheet
      buttonContent={configForm.buttonContent}
      title={configForm.title}
      formRef="user-form"
      description={configForm.description}
    >
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="username">
            Nome de usuario <span className="text-destructive">*</span>
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Digite o nome do usuario"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            aria-invalid={!!errors.username}
            className={errors.username || fetchError ? "border-destructive" : ""}
          />
          { errors.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
          )}
          {fetchError && (
            <p className="text-sm text-destructive">{fetchError}</p>
          )}
        </div>

        <div className="space-y-2">
          <InputPasswordWithMessage
            placeholder="Digite a senha do usuario"
            value={formData.password}
            isError={!!errors.password}
            messageError={errors.password}
            setValue={(value) => handleChange("password", value)}
            aria-invalid={!!errors.password}
          />
        </div>
      </form>
    </FormSheet>
  )
}
