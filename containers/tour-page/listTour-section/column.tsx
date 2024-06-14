import { ColumnDef } from "@tanstack/react-table";
import { Tour } from "@/types/Tour";
import { Icons } from "@/components/icons";
import DeleteConfirmDialog from "@/components/ui/delete-confirm-dialog";

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
          <Icons.edit size={18} />
        </button>
        <DeleteConfirmDialog
          title="Konfirmasi Penghapusan"
          description={`Apakah Anda yakin ingin menghapus wisata ${row.original.tour_name}?`}
          onConfirm={() => handleDelete(row.original.id)}
        />
      </div>
    ),
  },
];
