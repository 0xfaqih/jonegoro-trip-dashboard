"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/addInfoFormSchema';
import { useUploadBannerInfo } from '@/hooks/useUploadBannerInfo';
import { addInfo, updateInfo } from '@/utils/api';
import { InfoFormFields } from './InfoFormFields';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEditInfo } from '@/contexts/editInfoContext';
import { z } from 'zod';
import { PreviewInfo } from '../previewInfo-section';

type FormData = z.infer<typeof formSchema>;

export const AddInfo: React.FC = () => {
  const { editData, setEditData } = useEditInfo();
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
      if (isEditing) {
        await updateInfo({ ...data, id: editData?.id! }); 
        toast({
          variant: "success",
          title: "Success",
          description: "Info berhasil diperbarui!",
        });
      } else {
        await addInfo(data);
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
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <InfoFormFields form={formMethods} handleImageChange={handleImageChange} />
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : isEditing ? 'Update' : 'Submit'}
        </Button>
      </form>
      <PreviewInfo />
    </FormProvider>
  );
}