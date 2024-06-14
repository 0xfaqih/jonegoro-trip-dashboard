import { ColumnDef } from "@tanstack/react-table";
import { Accommodation } from "@/types/Accommodation";
import { Icons } from "@/components/icons";
import DeleteConfirmDialog from "@/components/ui/delete-confirm-dialog";

export const columns = (handleEdit: (id: number) => void, handleDelete: (id: number) => void): ColumnDef<Accommodation>[] => [
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
      accessorKey: "telephon",
      header: "Telephon",
   },
   {
      accessorKey: "location",
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
           <button onClick={() => handleEdit(row.original.id)}>
             <Icons.edit size={18} />
           </button>
           <DeleteConfirmDialog
             title="Konfirmasi Penghapusan"
             description={`Apakah Anda yakin ingin menghapus akomodasi ${row.original.name}?`}
             onConfirm={() => handleDelete(row.original.id)}
           />
         </div>
       ),
   },
];
