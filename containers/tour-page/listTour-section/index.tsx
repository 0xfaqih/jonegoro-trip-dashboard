"use client"
import { DataTable } from './data-table';
import { columns } from './column';
import { Tour } from './types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useTour } from '@/contexts/tourContext';

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
  const { tours, setTours } = useTour();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    getData().then(fetchedData => {
      setTours(fetchedData);
      setIsLoading(false);
    });
  }, [setTours]);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${id}`, {
      method: 'DELETE',
    });
    setTours(tours.filter(tour => tour.id !== id));
    toast({
      variant: "success",
      title: 'Success',
      description: `Berhasil menghapus wisata`,
    });
  };

  const handleEdit = (tour: Tour) => {
    router.push(`/tour/edit/${tour.id}`);
  };

  return (
    <div className="container mx-auto w-full flex-1">
      <DataTable columns={columns(handleEdit, handleDelete)} data={tours} isLoading={isLoading} />
    </div>
  );
}
