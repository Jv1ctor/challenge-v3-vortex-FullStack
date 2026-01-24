import type { Dispatch, ReactNode, SetStateAction } from "react"
import { Button } from "@/shared/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/shared/components/ui/table"
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet"

type Props = {
  title: string
  buttonLabel?: string
  tableCaption: string
  tableRowHeader: ReactNode
  tableRowBody: ReactNode
  sheetContent?: ReactNode
  setForms?: () => void
  openSheet?: boolean
  onOpenSheet?: Dispatch<SetStateAction<boolean>>
}

export const TableData = ({
  title,
  buttonLabel,
  tableCaption,
  tableRowHeader,
  tableRowBody,
  sheetContent,
  setForms,
  onOpenSheet,
  openSheet,
}: Props) => {
  return (
    <>
      <div className="">
        <Sheet open={openSheet} onOpenChange={onOpenSheet}>
          <div className="flex items-center justify-between bg-primary-foreground border-t-2 border-x-2 py-5 px-6 rounded-t-4xl">
            <h2 className="text-lg font-semibold text-secondary-foreground">
              {title}
            </h2>
            {buttonLabel && (
              <SheetTrigger asChild>
                <Button onClick={setForms} className="text-base cursor-pointer">
                  {buttonLabel}
                </Button>
              </SheetTrigger>
            )}
          </div>
          {sheetContent}

          <Table className="border-2">
            <TableCaption>{tableCaption}</TableCaption>
            <TableHeader>{tableRowHeader}</TableHeader>
            <TableBody>{tableRowBody}</TableBody>
          </Table>
        </Sheet>
      </div>
    </>
  )
}
