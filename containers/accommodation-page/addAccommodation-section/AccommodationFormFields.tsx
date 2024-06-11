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
import { formSchema } from "@/schemas/addAccommodationFormSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AccommodationFormFieldProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AccommodationFormField: React.FC<AccommodationFormFieldProps> = ({ form, handleImageChange }) => {
  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Akomodasi</FormLabel>
            <FormControl>
              <Input placeholder="Botok Asli Bojonegoro" {...field} className="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Harga</FormLabel>
            <FormControl>
              <Input placeholder="10000" {...field} className="" />
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
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kategori:</FormLabel>
            <FormControl>
              <RadioGroup {...field} value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hotel" id="hotel" />
                  <Label htmlFor="hotel">Hotel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Kuliner" id="kuliner" />
                  <Label htmlFor="kuliner">Kuliner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Transportasi" id="Transportasi" />
                  <Label htmlFor="Transportasi">Transportasi</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </FormProvider>
  );
};
