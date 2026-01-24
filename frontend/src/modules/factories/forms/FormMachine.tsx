import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { machineSchema, type MachineFormData } from "../schemas/machine.schema"
import { useForm } from "@/shared/hooks/form.hook"
import { FormSheet } from "@/shared/components/sheet/FormSheet"
import { useMemo } from "react"

type Props = {
  onSubmit: (data: MachineFormData) => void | Promise<void>
  initialData?: MachineFormData | null
  type: "create" | "edit"
}

export const FormMachine = ({ onSubmit, initialData, type }: Props) => {
  const configForm = {
    buttonContent: "Cadastrar Máquina",
    title: "Nova Máquina",
    description: "Preencha os dados para cadastrar uma nova máquina",
  }
  const initialFormData = useMemo(
    () =>
      initialData ?? {
        name: "",
        model: "",
        manufacturer: "",
        description: "",
      },
    [initialData],
  )

  const { formData, handleChange, errors, handleSubmit, fetchError } =
    useForm<MachineFormData>({
      initialData: initialFormData,
      onSubmit,
      schemaObject: machineSchema,
    })


  if (type === "edit") {
    configForm.buttonContent = "Salvar"
    configForm.title = "Editar Máquina"
    configForm.description = "Preencha os dados para editar a máquina escolhida"
  }

  return (
    <FormSheet
      buttonContent={configForm.buttonContent}
      formRef="machine-form"
      title={configForm.title}
      description={configForm.description}
    >
      <form
        id="machine-form"
        onSubmit={handleSubmit}
        className="space-y-4 py-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">
            Nome da Máquina <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite o nome da máquina"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={errors.name || fetchError ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
          {fetchError && (
            <p className="text-sm text-destructive">{fetchError}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">
            Modelo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="model"
            type="text"
            placeholder="Digite o modelo"
            value={formData.model}
            onChange={(e) => handleChange("model", e.target.value)}
            aria-invalid={!!errors.model}
            className={errors.model ? "border-destructive" : ""}
          />
          {errors.model && (
            <p className="text-sm text-destructive">{errors.model}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">
            Fabricante <span className="text-destructive">*</span>
          </Label>
          <Input
            id="manufacturer"
            type="text"
            placeholder="Digite o fabricante"
            value={formData.manufacturer}
            onChange={(e) => handleChange("manufacturer", e.target.value)}
            aria-invalid={!!errors.manufacturer}
            className={errors.manufacturer ? "border-destructive" : ""}
          />
          {errors.manufacturer && (
            <p className="text-sm text-destructive">{errors.manufacturer}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Digite a descrição da máquina"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            aria-invalid={!!errors.description}
            className={errors.description ? "border-destructive" : ""}
            rows={4}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>
      </form>
    </FormSheet>
  )
}
