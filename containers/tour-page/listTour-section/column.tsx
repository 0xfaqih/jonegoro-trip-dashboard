import { ColumnDef } from "@tanstack/react-table";
import { Tour } from "./types";
import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export const columns = (handleEdit: (tour: Tour) => void, handleDelete: (id: number) => void): ColumnDef<Tour>[] => [
  {
    id: "serial_number",
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
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
      <div className="flex gap-2">
        <button onClick={() => handleEdit(row.original)}>
          <Icons.edit size={18}/>
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>
              <Icons.delete size={18}/>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus wisata <span className="font-bold">{row.original.tour_name}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(row.original.id)}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];