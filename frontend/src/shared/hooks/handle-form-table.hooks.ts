import { useState } from "react"

export const useHandleFormTable = <T>() => {
  const [activeForm, setActiveForm] = useState<"create" | "edit" | null>(null)
  const [selectedData, setSelectedData] = useState<T | null>(null)
  const [idRef, setIdRef] = useState<number | string | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const openEditForm = (data: T, id?: number | string) => {
    if (!id) return
    setIdRef(id)
    setSelectedData(data)
    setActiveForm("edit")
    setOpen(true)
  }

  const openCreateForm = () => {
    setSelectedData(null)
    setActiveForm("create")
    setOpen(true)
  }

  const closeForm = () => {
    setSelectedData(null)
    setIdRef(null)
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
