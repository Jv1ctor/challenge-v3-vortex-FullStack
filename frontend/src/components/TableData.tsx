import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableHeader } from "@/components/ui/table"
type Props = {
  title: string
  buttonLabel: string
  tableCaption: string
  tableRowHeader: ReactNode
  tableRowBody: ReactNode
}

export const TableData = ({
  title,
  buttonLabel,
  tableCaption,
  tableRowHeader,
  tableRowBody,
}: Props) => {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between bg-primary-foreground border-t-2 border-x-2 py-5 px-6 rounded-t-4xl">
          <h2 className="text-lg font-semibold text-secondary-foreground">
            {title}
          </h2>
          <Button className="text-base cursor-pointer">{buttonLabel}</Button>
        </div>

        <Table className="border-2">
          <TableCaption>{tableCaption}</TableCaption>
          <TableHeader>{tableRowHeader}</TableHeader>
          <TableBody>{tableRowBody}</TableBody>
        </Table>
      </div>
    </>
  )
}
