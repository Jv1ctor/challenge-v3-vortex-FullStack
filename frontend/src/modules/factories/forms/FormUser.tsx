import { InputPasswordWithMessage } from "@/shared/components/InputPasswordWithMessage"
import { useForm } from "@/shared/hooks/form.hook"
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
  const { formData, handleChange, errors, handleSubmit } =
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
