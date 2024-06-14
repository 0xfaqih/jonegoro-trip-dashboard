"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/addInfoFormSchema';
import { useUploadBannerInfo } from '@/hooks/useUploadBannerInfo';
import { addInfo as addInfoToAPI, updateInfo } from '@/utils/api';
import { InfoFormFields } from './InfoFormFields';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEditInfo } from '@/contexts/infoContext';
import { z } from 'zod';
import { PreviewInfo } from '../previewInfo-section';

type FormData = z.infer<typeof formSchema>;

export const AddInfo: React.FC = () => {
  const { editData, setEditData, addInfo } = useEditInfo();
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      banner: '',
      content: '',
    }
  });

  const { uploadBanner, uploading, bannerUrl, error } = useUploadBannerInfo();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<boolean>(!!editData);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      try {
        await uploadBanner(e.target.files[0]);
        toast({
          variant: "success",
          title: "Success",
          description: "Banner Terupload!",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: 'Failed',
          description: `Gagal mengupload banner!`,
        });
      }
    }
  };

  useEffect(() => {
    if (bannerUrl) {
      formMethods.setValue('banner', bannerUrl);
    }
  }, [bannerUrl, formMethods]);

  useEffect(() => {
    if (editData) {
      formMethods.reset(editData);
      setIsEditing(true);
    } else {
      formMethods.reset({
        title: '',
        banner: '',
        content: '',
      });
      setIsEditing(false);
    }
  }, [editData, formMethods]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let newInfo;
      if (isEditing) {
        newInfo = await updateInfo({ ...data, id: editData?.id! });
        toast({
          variant: "success",
          title: "Success",
          description: "Info berhasil diperbarui!",
        });
      } else {
        const response = await addInfoToAPI(data);
        newInfo = response.data;
        addInfo(newInfo); 
        toast({
          variant: "success",
          title: "Success",
          description: "Info berhasil dikirim!",
        });
      }
      formMethods.reset();
      setEditData(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed',
        description: `Gagal ${isEditing ? 'memperbarui' : 'mengirim'} info!`,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 mx-auto w-full">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4 mr-6">
          <h1 className='text-2xl font-bold text-center mb-6'>
            {isEditing ? 'Edit Informasi' : 'Buat Informasi'}
          </h1>
          <InfoFormFields form={formMethods} handleImageChange={handleImageChange} />
          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? 'Uploading...' : isEditing ? 'Update' : 'Submit'}
          </Button>
        </form>
        <PreviewInfo/>
      </FormProvider>
    </div>
  );
};
