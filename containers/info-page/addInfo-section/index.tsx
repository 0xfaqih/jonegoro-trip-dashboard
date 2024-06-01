"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from '@/schemas/addInfoFormSchema';
import { useUploadBannerInfo } from '@/hooks/useUploadBannerInfo';
import { addInfo } from '@/utils/api';
import { InfoFormFields } from './InfoFormFields';
import { Button } from '@/components/ui/button';
type FormData = z.infer<typeof formSchema>;

export const AddInfo: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      banner: '',
      content: '',
    }
  });

  const { uploadBanner, uploading, bannerUrl, error } = useUploadBannerInfo();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      await uploadBanner(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (bannerUrl) {
      form.setValue('banner', bannerUrl);
    }
  }, [bannerUrl, form]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await addInfo(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InfoFormFields form={form} handleImageChange={handleImageChange} />
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
};
