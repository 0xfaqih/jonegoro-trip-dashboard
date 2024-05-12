"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import React, {ChangeEvent} from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { ComboBoxCategory } from "./combo-box"

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

const uploadImageToImgur = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID',
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.link;
    } else {
      console.error('Gagal mengunggah gambar ke Imgur');
      return null;
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return null;
  }
};


const uploadImageAndGetUrl = async (image: Blob) => {
  const file = new File([image], 'image.jpg', { type: 'image/jpeg' });
  const imageUrl = await uploadImageToImgur(file); // Fungsi untuk mengunggah gambar ke Imgur
  return imageUrl;
};

const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const selectedImage = event.target.files?.[0];
  if (selectedImage) {
    const imageUrl = await uploadImageToImgur(selectedImage)
     if (imageUrl) {
      console.log('URL gambar di Imgur:', imageUrl);
    }
  }
};

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tour_name: "",
      place: "",
      rating: "0",
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

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const ratingValue = parseFloat(values.rating);
    const priceValues = {
      ticket: parseFloat(values.price.ticket),
      motor_park: parseFloat(values.price.motor_park),
      car_park: parseFloat(values.price.car_park)
    };
  
    if (!isNaN(ratingValue) && !Object.values(priceValues).some(isNaN)) {
      const formValues = {
        ...values,
        rating: ratingValue,
        price: priceValues,
      };
  
      const imageUrls = await Promise.all(values.images.map(async (image) => {
        const file = new File([image], 'image.jpg', { type: 'image/jpeg' }); // convert the image to a File object
        return await uploadImageToImgur(file);
      }));
  
      formValues.images = [imageUrls[0], ...imageUrls.slice(1)];
  
      console.log(formValues);
      // Send formValues to your API
    } else {
      console.error('Invalid values. Please enter valid numbers for rating and price fields.');
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
             <FormDescription>
               This is your public display name.
             </FormDescription>
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
       <div className="flex justify-center space-x-4">
         <FormField
           control={form.control}
           name="rating"
           render={({ field }) => (
             <FormItem className="flex items-center space-x-2">
               <FormLabel className="mr-2">Rating</FormLabel>
               <FormControl>
                 <Input placeholder="4.7" {...field} className="mr-2"/>
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           control={form.control}
           name="category"
           render={({ field }) => (
             <FormItem className="flex items-center align-middle space-x-2">
               <FormLabel className="mr-2">Kategori</FormLabel>
                <ComboBoxCategory/>
               <FormMessage />
             </FormItem>
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
           <FormItem>
             <FormLabel>Images</FormLabel>
             <FormControl>
               <Input type="file" multiple {...field} onChange={handleImageChange}/>
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
             <FormLabel>Ticket Price</FormLabel>
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
             <FormLabel>Motor Park Price</FormLabel>
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
             <FormLabel>Car Park Price</FormLabel>
             <FormControl>
               <Input type="number" {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       
       <Button type="submit">Submit</Button>
     </form>
   </Form>
  );
         }
