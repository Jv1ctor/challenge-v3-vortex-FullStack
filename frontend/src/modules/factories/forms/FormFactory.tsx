import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { factorySchema, type FactoryFormData } from "../schemas/factory.schema"
import { useForm } from "@/hooks/form.hook"

type Props = {
  onSubmit: (data: FactoryFormData) => void | Promise<void>
  initialData?: FactoryFormData | null
}

export const FormFactory = ({ onSubmit, initialData }: Props) => {
  const { formData, errors, handleChange, handleSubmit } =
    useForm<FactoryFormData>({
      initialData: initialData ?? {
        address: "",
        city: "",
        country: "",
        name: "",
      },
      onSubmit,
      schemaObject: factorySchema,
    })

  return (
    <form id="factory-form" onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Nome da Fábrica <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Digite o nome da fábrica"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          aria-invalid={!!errors.name}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">
          País <span className="text-destructive">*</span>
        </Label>
        <Input
          id="country"
          type="text"
          placeholder="Digite o país"
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value)}
          aria-invalid={!!errors.country}
          className={errors.country ? "border-destructive" : ""}
        />
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">
          Cidade <span className="text-destructive">*</span>
        </Label>
        <Input
          id="city"
          type="text"
          placeholder="Digite a cidade"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          aria-invalid={!!errors.city}
          className={errors.city ? "border-destructive" : ""}
        />
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Endereço <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="Digite o endereço completo"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          aria-invalid={!!errors.address}
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>
    </form>
  )
}
