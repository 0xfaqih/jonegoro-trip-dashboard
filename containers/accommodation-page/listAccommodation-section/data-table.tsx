"use client"

import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   useReactTable,
} from "@tanstack/react-table"

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[];
   isLoading?: boolean;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   isLoading
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   })

   return (
      <div className="rounded-md border">
         <Table className="">
            <TableHeader className="sticky top-0">
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead key={header.id} className="sticky top-0 bg-white bg-opacity-50 backdrop-blur-sm z-10">
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                           </TableHead>
                        )
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {isLoading ? (
                  [...Array(7)].map((_, index) => (
                     <TableRow key={index}>
                        <TableCell colSpan={columns.length}>
                           <Skeleton className="h-8 w-full" />
                        </TableCell>
                     </TableRow>
                  ))
               ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={columns.length} className="h-24 text-center">
                        Tidak ada data.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   )
}
