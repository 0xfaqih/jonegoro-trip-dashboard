"use client"

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
      images: [""],
      price: {
        ticket: "10",
        motor_park: "0",
        car_park: "0"
      }
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ratingValue = parseFloat(values.rating);
    const priceValues = {
      ticket: parseFloat(values.price.ticket),
      motor_park: parseFloat(values.price.motor_park),
      car_park: parseFloat(values.price.car_park),
    };

    if (!isNaN(ratingValue) && !Object.values(priceValues).some(isNaN)) {
      const uploadedImageUrls = await uploadImagesToSupabase(imageFiles);

      if (uploadedImageUrls.length > 0) {
        const formValues = {
          ...values,
          rating: ratingValue,
          images: uploadedImageUrls,
          price: priceValues,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border-solid border p-4 w-full rounded-md flex-1">
        <TourFormFields form={form} handleImageChange={handleImageChange} />
        <Loading isLoading={isLoading} />
        <Button type="submit" className="mt-5">Submit</Button>
      </form>
    </Form>
  );
}
