// components/info-page/columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { Info } from "@/types/Info";
import { Icons } from "@/components/icons";
import DeleteConfirmDialog from "@/components/ui/delete-confirm-dialog";

export const columns = (handleEdit: (id: number) => void, handleDelete: (id: number) => void): ColumnDef<Info>[] => [
  {
    id: "serial_number",
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Judul",
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
          description={`Apakah Anda yakin ingin menghapus informasi ${row.original.title}?`}
          onConfirm={() => handleDelete(row.original.id)}
        />
      </div>
    ),
  },
];
