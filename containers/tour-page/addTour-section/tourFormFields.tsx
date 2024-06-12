import React, { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { formSchema } from "@/schemas/addTourFormSchema";
import { tourCategory } from "@/constants/tourCategory";

interface TourFormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TourFormFields: React.FC<TourFormFieldsProps> = ({ form, handleImageChange }) => {
  return (
    <>
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
            <FormLabel>Lokasi</FormLabel>
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
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="4.7" {...field} className="" />
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
          name="category"
          control={form.control}
          render={({ field }) => (
            <div className="">
              <FormLabel>Ketegori</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={`w-[200px] mt-2 justify-between ${!field.value ? 'text-muted-foreground' : ''}`}
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
              <Textarea placeholder="deskripsi..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="price flex gap-2">
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
            <FormItem className="hidden">
              <FormLabel>Harga Parkir Motor</FormLabel>
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
            <FormItem className="hidden">
              <FormLabel>Harga Parkir Mobil</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
