import { ColumnDef } from "@tanstack/react-table";
import { Tour } from "./types";

export const columns = (handleEdit: (tour: Tour) => void, handleDelete: (id: number) => void): ColumnDef<Tour>[] => [
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
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <div>
        <button onClick={() => handleEdit(row.original)}>Edit</button>
        <button onClick={() => handleDelete(row.original.id)}>Delete</button>
      </div>
    ),
  },
];
