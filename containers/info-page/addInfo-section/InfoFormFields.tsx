// components/InfoFormFields.tsx
import React, { ChangeEvent } from "react";
import { UseFormReturn, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { formSchema } from "@/schemas/addInfoFormSchema";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

interface InfoFormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InfoFormFields: React.FC<InfoFormFieldsProps> = ({ form, handleImageChange }) => {
  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Judul</FormLabel>
            <FormControl>
              <Input placeholder="isi judul" {...field} className="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="banner"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Banner</FormLabel>
            <FormControl>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Editor value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormProvider>
  );
};
