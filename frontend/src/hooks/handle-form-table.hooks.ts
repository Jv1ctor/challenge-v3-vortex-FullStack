import { useState } from "react"

export const useHandleFormTable = <T>() => {
  const [activeForm, setActiveForm] = useState<"create" | "edit" | null>(null)
  const [selectedData, setSelectedData] = useState<T | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const openEditForm = (data: T) => {
    setSelectedData(data)
    setActiveForm("edit")
    setOpen(true)
  }

  const openCreateForm = () => {
    setActiveForm("create")
    setOpen(true)
  }

  const closeForm = () => {
    setOpen(false)
  }

  return {
    activeForm,
    open,
    setOpen,
    closeForm,
    selectedData,
    openEditForm,
    openCreateForm,
  }
}
