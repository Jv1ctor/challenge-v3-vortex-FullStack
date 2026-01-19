import { useState } from "react"

export const useHandleFormTable = <T>() => {
  const [activeForm, setActiveForm] = useState<"create" | "edit" | null>(null)
  const [selectedData, setSelectedData] = useState<T | null>(null)
  const [idRef, setIdRef] = useState<number | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const openEditForm = (data: T, id?: number) => {
    setSelectedData(data)
    if (id) setIdRef(id)
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
    idRef,
    setOpen,
    closeForm,
    selectedData,
    openEditForm,
    openCreateForm,
  }
}
