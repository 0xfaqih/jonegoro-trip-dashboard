"use client"

import { DataTable } from './data-table';
import { columns } from './column';
import { Tour } from './types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export async function getData(): Promise<Tour[]> {
  // Fetch data from your API here.
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`, {
    next: { revalidate: 10 },
  });
  const responseData = await response.json();
  const data = responseData.data;
  const filteredData = data.map((tour: any) => ({
    id: tour.id,
    tour_name: tour.tour_name,
    place: tour.place,
    category: `Wisata ${tour.category}`,
  }));
  return filteredData;
}

export default function TourList() {
  const [data, setData] = useState<Tour[]>([]);
  const router = useRouter();

  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${id}`, {
      method: 'DELETE',
    });
    setData(data.filter(tour => tour.id !== id));
  };

  const handleEdit = (tour: Tour) => {
    // Redirect to the edit page
    router.push(`/tour/edit/${tour.id}`);
  };

  return (
    <div className="container mx-auto py-10 ml-2 w-full">
      <DataTable columns={columns(handleEdit, handleDelete)} data={data} />
    </div>
  );
}
