"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "@/schemas/addTourFormSchema";
import { TourFormFields } from "./tourFormFields";
import { useUploadImages } from "@/hooks/useUploadImage";
import { postTourData } from "@/utils/api";
import { z } from "zod";
import Loading from "@/components/Loading";
import { useTour } from "@/contexts/tourContext";

export function AddTour() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { uploadImagesToSupabase, isLoading } = useUploadImages();
  const { toast } = useToast();
  const { addTour } = useTour();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tour_name: "",
      place: "",
      rating: "4.0",
      desc: "",
      category: "",
      images: [""]
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ratingValue = parseFloat(values.rating);

    if (!isNaN(ratingValue)) {
      const uploadedImageUrls = await uploadImagesToSupabase(imageFiles);

      if (uploadedImageUrls.length > 0) {
        const formValues = {
          ...values,
          rating: ratingValue,
          images: uploadedImageUrls,
        };

        try {
          const response = await postTourData(formValues);
          const newTourData = {
            id: response.data.newTour.id,
            tour_name: response.data.newTour.tour_name,
            place: response.data.newTour.place,
            category: `Wisata ${response.data.newTour.category}`,
          };
          addTour(newTourData);
          toast({
            variant: "success",
            title: 'Success',
            description: 'Berhasil menambahkan data',
          });
        } catch (error) {
          if (error instanceof Error) {
            toast({
              variant: "destructive",
              title: 'Failed',
              description: `Error: ${error.message}`,
            });
          } else {
            toast({
              variant: "destructive",
              title: 'Failed',
              description: 'An unknown error occurred',
            });
          }
        }
      } else {
        toast({
          variant: "destructive",
          title: 'Failed',
          description: 'No images were uploaded successfully.',
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: 'Failed',
        description: 'Invalid values. Please enter valid numbers for rating and price fields.',
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">Tambah Wisata</h1>
          <TourFormFields form={form} handleImageChange={handleImageChange} />
          <Loading isLoading={isLoading} />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
