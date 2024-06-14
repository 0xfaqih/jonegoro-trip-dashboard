import { ColumnDef } from "@tanstack/react-table";
import { Souvenir } from "@/types/Souvenir";
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

export const columns = (handleEdit: (id: number) => void, handleDelete: (id: number) => void): ColumnDef<Souvenir>[] => [
   {
      id: "serial_number",
      header: "No",
      cell: ({ row }) => <div>{row.index + 1}</div>,
   },
   {
      accessorKey: "name",
      header: "Nama",
   },
   {
      accessorKey: "location",
      header: "Lokasi",
   },
   {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
         <div className="flex gap-2">
            <button onClick={() => handleEdit(row.original.id)}>
               <Icons.edit size={18} />
            </button>
            <AlertDialog>
               <AlertDialogTrigger asChild>
                  <button>
                     <Icons.delete size={18} />
                  </button>
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                     <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus oleh oleh ini <span className="font-bold">{row.original.name}</span>?
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
