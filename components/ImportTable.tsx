import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"
import { useState } from "react"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
   } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
   
  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
} 

const ImportTable = ({ transactions, suggestedColumn, onColumnChange }: ImportTableProps) => {
  //TODO: Handle suggested columns
  const [selectedColumn, setSelectedColumn] = useState(suggestedColumn || 0)

  const handleColumnChange = (column: number) => {
    setSelectedColumn(column)
    onColumnChange(column)
  }
  
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead 
            className={cn("px-2", selectedColumn === 0 && "bg-yellow-100")}
            onClick={() => handleColumnChange(0)}>
              Date
          </TableHead>
          <TableHead 
            className={cn("px-2", selectedColumn === 1 && "bg-yellow-100")}
            onClick={() => handleColumnChange(1)}>
              Receipt
          </TableHead>
          <TableHead 
            className={cn("px-2", selectedColumn === 2 && "bg-yellow-100")}
            onClick={() => handleColumnChange(2)}>
              Description
          </TableHead>
          <TableHead 
            className={cn("px-2", selectedColumn === 3 && "bg-yellow-100")}
            onClick={() => handleColumnChange(3)}>
              Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date))
          const amount = formatAmount(t.amount)

          const isDebit = t.type === 'debit';
          const isCredit = t.type === 'credit';

          return (
            <TableRow key={t.id} className={`!over:bg-none !border-b-DEFAULT`}>
              <TableCell className={cn("max-w-[250px] pl-2 pr-10", selectedColumn === 0 && "bg-yellow-50")}>
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell className={cn("pl-2 pr-10 font-semibold", selectedColumn === 1 && "bg-yellow-50")}>
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>

              <TableCell className={cn("pl-2 pr-10", selectedColumn === 2 && "bg-yellow-50")}>
                <CategoryBadge category={status} /> 
              </TableCell>

              <TableCell className={cn("min-w-32 pl-2 pr-10", selectedColumn === 3 && "bg-yellow-50")}>
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ImportTable