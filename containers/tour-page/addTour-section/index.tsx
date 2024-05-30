"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState, ChangeEvent } from "react"
import axios from "axios"
import { supabase } from "@/lib/supabaseClient" 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const tourCategory = [
  { label: "Wisata Alam", value: "Alam" },
  { label: "Wisata Religi", value: "Religi" },
  { label: "Wisata Buatan", value: "Buatan" },
  { label: "Wisata Edukasi", value: "Edukasi" },
] as const

const formSchema = z.object({
  tour_name: z.string().min(2, {
    message: "tour_name must be at least 2 characters.",
  }),
  place: z.string().min(3, {
    message: "Place must be at least 3 characters.",
  }),
  rating: z.string().min(1, {
    message: "Rating must be at least 1.",
  }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  images: z.array(z.string()).nonempty("At least one image is required"),
  price: z.object({
    ticket: z.string(),
    motor_park: z.string(),
    car_park: z.string()
  })
})

export function AddTour() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast()

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
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
      console.log("Images selected: ", Array.from(e.target.files));
    }
  }

  const uploadImagesToSupabase = async (files: File[]): Promise<string[]> => {
    console.log("Starting image upload...");
    const uploadedUrls = await Promise.all(files.map(async (file) => {
      const uniqueId = `${uuidv4()}_${file.name}`;
      const { data, error } = await supabase
        .storage
        .from('image-tour') 
        .upload(`public/${uniqueId}`, file)

      if (error) {
        console.error('Error uploading image:', error)
        return ''
      }

      const url = supabase
        .storage
        .from('image-tour')
        .getPublicUrl(`public/${uniqueId}`)
        .data.publicUrl

      console.log('Uploaded image URL:', url);
      return url
    }))
    console.log('All uploaded image URLs:', uploadedUrls);
    return uploadedUrls.filter(url => url !== '')
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Form values before processing:", values);

    const ratingValue = parseFloat(values.rating);
    const priceValues = {
      ticket: parseFloat(values.price.ticket),
      motor_park: parseFloat(values.price.motor_park),
      car_park: parseFloat(values.price.car_park)
    };

    console.log("Parsed rating value:", ratingValue);
    console.log("Parsed price values:", priceValues);

    if (!isNaN(ratingValue) && !Object.values(priceValues).some(isNaN)) {
      const uploadedImageUrls = await uploadImagesToSupabase(imageFiles);

      if (uploadedImageUrls.length > 0) {
        const formValues = {
          ...values,
          rating: ratingValue,
          images: uploadedImageUrls,
          price: priceValues,
        };

        console.log("Final form values to be submitted:", formValues);

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`, formValues, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 201) {
            console.log('Tour added successfully');
            console.log('Response data:', response.data);
            toast({
              variant: "default",
              title: 'Success',
              description: 'Berhasil menambahkan data',
            })
            setIsLoading(false);
          } else {
            toast({
              variant: "destructive",
              title: 'Failed',
              description: `Error ${response.status}: ${response.statusText}`,
            })
            setIsLoading(false);
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: 'Failed',
            description:  `Error: ${error}`,
          })
          setIsLoading(false);
        }
      } else {
        toast({
          variant: "destructive",
          title: 'Failed',
          description:  'No images were uploaded successfully.',
        })
        setIsLoading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: 'Failed',
        description:  'Invalid values. Please enter valid numbers for rating and price fields.',
      })
      setIsLoading(false);
    }
  }

  return (
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
       <FormField
         control={form.control}
         name="place"
         render={({ field }) => (
           <FormItem>
             <FormLabel >Lokasi</FormLabel>
             <FormControl>
               <Input placeholder="London" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <div className="flex space-x-4">
         <FormField
           control={form.control}
           name="rating"
           render={({ field }) => (
             <FormItem className="flex items-center space-x-2">
               <FormLabel>Rating</FormLabel>
               <FormControl>
                 <Input placeholder="4.7" {...field} className=""/>
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center">
              <FormLabel className="mr-2">Ketegori</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={`w-[200px] justify-between ${!field.value ? 'text-muted-foreground' : ''}`}
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
       
       <FormField
         control={form.control}
         name="desc"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Deskripsi</FormLabel>
             <FormControl>
              <Textarea placeholder="deskripsi..." {...field}/>
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />

       <FormField
         control={form.control}
         name="images"
         render={({ field }) => (
           <FormItem >
             <FormLabel >Foto</FormLabel>
             <FormControl>
               <Input type="file" multiple onChange={handleImageChange} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />

       <FormField
         control={form.control}
         name="price.ticket"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Harga Tiket</FormLabel>
             <FormControl>
               <Input type="number" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <FormField
         control={form.control}
         name="price.motor_park"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Harga Parkir Mobil</FormLabel>
             <FormControl>
               <Input type="number" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <FormField
         control={form.control}
         name="price.car_park"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Harga Parkir Mobile</FormLabel>
             <FormControl>
               <Input type="number" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-solid border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white mt-2 animate-bounce">Memuat</span>
          </div>
        </div>
      )}

       <Button type="submit" className="mt-5">Submit</Button>
     </form>
   </Form>
  );
}
