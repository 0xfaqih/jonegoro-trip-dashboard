'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Loading";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

import { tourCategory } from "@/constants/tourCategory";
import Image from "next/image";

const formSchema = z.object({
  tour_name: z.string().min(2, { message: "tour_name must be at least 2 characters." }),
  place: z.string().min(3, { message: "Place must be at least 3 characters." }),
  rating: z.string().min(1, { message: "Rating must be at least 1." }),
  desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string({ required_error: "Category is required" }),
  images: z.array(z.string()),
});

const TourEditForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const tourId = params.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tour_name: "",
      place: "",
      rating: "4.0",
      desc: "",
      category: "",
      images: [],
    },
  });

  useEffect(() => {
    if (tourId) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}`)
        .then(response => {
          const tourData = response.data.data;
          form.reset({
            ...tourData,
            rating: tourData.rating.toString(),
            images: tourData.images.map((img: any) => img.url),
          });
          setImageUrls(tourData.images.map((img: any) => img.url));
          setIsLoaded(true);
        })
        .catch(error => {
          console.error('Error fetching tour data:', error);
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, [tourId, form]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(prevFiles => [...prevFiles, ...files]);
      const urls = files.map(file => URL.createObjectURL(file));
      setImageUrls(prevUrls => [...prevUrls, ...urls]);
    }
  };

  const removeImage = async (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    const deletedImageUrl = imageUrls[index];
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);

    const newFormImages = [...form.getValues("images")];
    newFormImages.splice(index, 1);
    form.setValue("images", newFormImages);

    const imagePath = deletedImageUrl.split('/').slice(-1)[0];
    try {
      const { error } = await supabase.storage.from('image-tour').remove([`public/${imagePath}`]);
      if (error) {
        console.error('Error removing image from Supabase:', error);
        toast({
          variant: "destructive",
          title: 'Error',
          description: 'Failed to remove image from storage.',
        });
      } else {
        toast({
          variant: "success",
          title: 'Success',
          description: 'Image removed from storage.',
        });
      }
    } catch (error) {
      console.error('Error removing image from Supabase:', error);
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Failed to remove image from storage.',
      });
    }
  };

  const uploadImagesToSupabase = async (files: File[]): Promise<string[]> => {
    const uploadedUrls = await Promise.all(files.map(async (file) => {
      const uniqueId = `${uuidv4()}_${file.name}`;
      const { data, error } = await supabase.storage.from('image-tour').upload(`public/${uniqueId}`, file);

      if (error) {
        console.error('Error uploading image:', error);
        return '';
      }

      const url = supabase.storage.from('image-tour').getPublicUrl(`public/${uniqueId}`).data.publicUrl;
      return url;
    }));
    return uploadedUrls.filter(url => url !== '');
  };

  const addImageToAPI = async (imageUrls: string[]) => {
    try {
      await Promise.all(imageUrls.map(async (url) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/add-image`, {
          id: tourId,
          url: url
        });
      }));
    } catch (error) {
      console.error('Error adding image to API:', error);
      throw new Error('Failed to add image to API');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const ratingValue = parseFloat(values.rating);

    if (!isNaN(ratingValue)) {
      let uploadedImageUrls: string[] = [];

      if (imageFiles.length > 0) {
        uploadedImageUrls = await uploadImagesToSupabase(imageFiles);
      }

      const existingImages = form.getValues("images").filter(url => !url.startsWith('blob:'));
      const formValues = {
        ...values,
        rating: ratingValue,
        images: existingImages,
      };

      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}`, formValues, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          if (uploadedImageUrls.length > 0) {
            await addImageToAPI(uploadedImageUrls);
          }
          toast({
            variant: "success",
            title: 'Success',
            description: 'Berhasil memperbarui data',
          });
          router.push('/tour');
        } else {
          toast({
            variant: "destructive",
            title: 'Failed',
            description: `Error ${response.status}: ${response.statusText}`,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: 'Failed',
          description: `Error: ${error}`,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: 'Failed',
        description: 'Invalid values. Please enter valid numbers for rating field.',
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoaded ? (
        <div className="border-solid border p-4 mr-2 w-full rounded-md">
          <Skeleton className="w-40 h-5 mb-2" />
          <Skeleton className="w-full h-10 mb-2" />
          <div className="flex gap-2 mb-2">
            <div className="flex flex-col">
              <Skeleton className="w-40 h-5 mb-2" />
              <Skeleton className="w-40 h-10" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-40 h-5 mb-2" />
              <Skeleton className="w-40 h-10" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-40 h-5 mb-2" />
              <Skeleton className="w-40 h-10" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-40 h-5 mb-2" />
              <Skeleton className="w-40 h-10" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
          <Skeleton className="w-40 h-5 mb-2" />
          <Skeleton className="w-full h-32 mb-2" />
          <Skeleton className="w-24 h-11" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="border-solid border p-4 mr-2 w-full rounded-md">
            <FormField
              control={form.control}
              name="tour_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Wisata</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. Kayangan Api" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input placeholder="London" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input type="file" multiple onChange={handleImageChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FormLabel className="mt-2 mb-2">Kategori</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[200px] justify-between"
                        >
                          {field.value
                            ? tourCategory.find(category => category.value === field.value)?.label
                            : 'Pilih kategori'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {tourCategory.map(category => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => {
                                  field.onChange(category.value);
                                }}
                              >
                                {category.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative ">
                  <Image
                    src={url}
                    alt={`image-${index}`}
                    className='w-full object-cover rounded'
                    width={200}
                    height={100}
                  />
                  <button
                    type="button"
                    className="absolute text-center top-2 right-2 flex items-center justify-center bg-black text-white p-1 rounded-full w-10 h-10"
                    onClick={() => removeImage(index)}
                  >
                    <Icons.delete />
                  </button>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="deskripsi..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Loading isLoading={isLoading} />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  );
}

export default TourEditForm;
