import { Payment, columns } from "./column"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      tour_name: "Jj",
      place: "Tuban",
      category: "Alam",
    },
    // ...
  ]
}
 
export default async function TourList() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10 ml-2 w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}