"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/addAccommodationFormSchema';
import { useUploadImageSouvenir } from '@/hooks/useUploadImageSouvenir';
import {addAccommodation as addAccommodationToAPI, updateAccommodation as updateAccommodationToAPI} from '@/utils/api';
import { AccommodationFormField } from './AccommodationFormFields';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useAccommodation } from '@/contexts/accommodationContext';

type FormData = z.infer<typeof formSchema>;

export const AddAccommodation: React.FC = () => {
  const { editData, setEditData, addAccommodation, updateAccommodation } = useAccommodation();
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: '',
      telephon: '',
      location: '',
      category: ''
    }
  });

  const { uploadImage, uploading, imageUrl, error } = useUploadImageSouvenir();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<boolean>(!!editData);

  useEffect(() => {
    if (isEditing && imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, isEditing]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      try {
        await uploadImage(e.target.files[0]);
        toast({
          variant: "success",
          title: "Success",
          description: "Foto Terupload!",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: 'Failed',
          description: `Gagal mengupload Foto!`,
        });
      }
    }
  };

  useEffect(() => {
    if (imageUrl) {
      formMethods.setValue('image', imageUrl);
    }
  }, [imageUrl, formMethods]);

  useEffect(() => {
    if (editData) {
      formMethods.reset(editData);
      setIsEditing(true);
      if (editData.image) {
        setImagePreview(editData.image);
      }
    } else {
      formMethods.reset({
        name: '',
        image: '',
        telephon: '',
        location: '',
        category: ''
      });
      setIsEditing(false);
    }
  }, [editData, formMethods]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let newAccommodation;
      if (isEditing) {
        newAccommodation = await updateAccommodationToAPI({ ...data, id: editData?.id! });
        updateAccommodation(newAccommodation);
        toast({
          variant: "success",
          title: "Success",
          description: "Akomodasi berhasil diperbarui!",
        });
      } else {
        const response = await addAccommodationToAPI(data);
        if (response && response.data) {
          newAccommodation = response.data;
          addAccommodation(newAccommodation);
          toast({
            variant: "success",
            title: "Success",
            description: "Akomodasi berhasil dikirim!",
          });
        } else {
          console.error("Unexpected response:", response);
          throw new Error("Unexpected response structure");
        }
      }
      formMethods.reset();
      setEditData(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast({
        variant: "destructive",
        title: 'Failed',
        description: `Gagal ${isEditing ? 'memperbarui' : 'mengirim'} oleh oleh!`,
      });
    }
  };



  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <h1 className='mb-4 text-2xl font-bold'>
          {isEditing ? 'Edit Akomodasi' : 'Tambahkan Akomodasi'}
        </h1>
        <AccommodationFormField form={formMethods} handleImageChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className='mb-4' />
        )}
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : isEditing ? 'Update' : 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
};
