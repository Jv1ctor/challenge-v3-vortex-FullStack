import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  registrySchema,
  type RegistryFormData,
} from "../schemas/registry.schema"
import { useForm } from "@/shared/hooks/form.hook"
import { FormSheet } from "@/shared/components/sheet/FormSheet"
import { useMemo } from "react"

type Props = {
  onSubmit: (data: RegistryFormData) => void | Promise<void>
  initialData?: RegistryFormData | null
}

export const FormRegistry = ({ onSubmit, initialData }: Props) => {
  const configForm = {
    buttonContent: "Salvar",
    title: "Editar Registro",
    description: "Atualize o valor do registro",
  }

  const initialFormData = useMemo(
    () =>
      initialData ?? {
        value: 0,
      },
    [initialData],
  )
  const { formData, errors, fetchError, handleChange, handleSubmit } =
    useForm<RegistryFormData>({
      initialData: initialFormData,
      onSubmit,
      schemaObject: registrySchema,
    })

  return (
    <FormSheet
      buttonContent={configForm.buttonContent}
      formRef="registry-form"
      title={configForm.title}
      description={configForm.description}
    >
      <form
        id="registry-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4 py-4"
      >
        <div className="space-y-2">
          <Label htmlFor="value">
            Valor (kWh) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="value"
            type="number"
            step="0.5"
            placeholder="Digite o valor em kWh"
            value={formData.value}
            onChange={(e) =>
              handleChange(
                "value",
                e.target.value !== "" ? Number(e.target.value) : e.target.value,
              )
            }
            aria-invalid={!!errors.value}
            className={errors.value || fetchError ? "border-destructive" : ""}
          />
          {errors.value && (
            <p className="text-sm text-destructive">{errors.value}</p>
          )}
          {fetchError && (
            <p className="text-sm text-destructive">{fetchError}</p>
          )}
        </div>
      </form>
    </FormSheet>
  )
}
