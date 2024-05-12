import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number
  tour_name: string
  category: "Religi" | "Alam" | "Buatan" | "Edukasi" | "Budaya"
  place: string
}
 
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "tour_name",
    header: "Wisata",
  },
  {
    accessorKey: "place",
    header: "Lokasi",
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
]