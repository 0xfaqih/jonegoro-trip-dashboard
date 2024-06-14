import React, { ChangeEvent } from "react";
import { UseFormReturn, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { formSchema } from "@/schemas/addSouvenirFormSchema";

interface SouvenirFormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SouvenirFormFields: React.FC<SouvenirFormFieldsProps> = ({ form, handleImageChange }) => {
  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input placeholder="Botok Asli Bojonegoro" {...field} className="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lokasi</FormLabel>
            <FormControl>
              <Input placeholder="lokasi" {...field} className="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foto</FormLabel>
            <FormControl>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormProvider>
  );
};
