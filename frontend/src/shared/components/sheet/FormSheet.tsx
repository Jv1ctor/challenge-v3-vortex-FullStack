import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import { Button } from "@/shared/components/ui/button"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  formRef: string
  buttonContent: string
  title: string
  description?: string
}

export const FormSheet = ({
  formRef,
  children,
  buttonContent,
  title,
  description,
}: Props) => {
  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">{children}</div>
        <SheetFooter>
          <Button type="submit" form={formRef}>
            {buttonContent}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  )
}
