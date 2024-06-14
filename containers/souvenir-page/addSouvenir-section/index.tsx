"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/addSouvenirFormSchema';
import { useUploadImageSouvenir } from '@/hooks/useUploadImageSouvenir';
import { addSouvenir as addSouvenirToAPI, updateSouvenir as updateSouvenirToAPI } from '@/utils/api';
import { SouvenirFormFields } from './SouvenirFormFields';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSouvenir } from '@/contexts/souvenirContext';
import { z } from 'zod';
import Image from 'next/image';

type FormData = z.infer<typeof formSchema>;

export const AddSouvenir: React.FC = () => {
  const { editData, setEditData, addSouvenir, updateSouvenir } = useSouvenir();
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: '',
      location: ''
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
        location: ''
      });
      setIsEditing(false);
    }
  }, [editData, formMethods]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let newSouvenir;
      if (isEditing) {
        newSouvenir = await updateSouvenirToAPI({ ...data, id: editData?.id! });
        updateSouvenir(newSouvenir);
        toast({
          variant: "success",
          title: "Success",
          description: "Oleh - oleh berhasil diperbarui!",
        });
      } else {
        const response = await addSouvenirToAPI(data);
        if (response && response.data) {
          newSouvenir = response.data;
          addSouvenir(newSouvenir);
          toast({
            variant: "success",
            title: "Success",
            description: "Oleh - oleh berhasil dikirim!",
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
          {isEditing ? 'Edit Oleh - Oleh' : 'Tambahkan Oleh - Oleh'}
        </h1>
        <SouvenirFormFields form={formMethods} handleImageChange={handleImageChange} />
        {imagePreview && (
          <Image
          src={imagePreview}
          alt="Preview"
          className='mb-4'
          width={400}
          height={100}
          />
        )}
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : isEditing ? 'Update' : 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
};
