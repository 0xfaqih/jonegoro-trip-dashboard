"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card"

export const PreviewInfo: React.FC = () => {
  const { watch } = useFormContext();
  const title = watch('title');
  const banner = watch('banner');
  const content = watch('content');

  return (
    <Card>
      <CardContent className='mt-4'>
        <CardDescription>Preview:</CardDescription>
        <div className='mb-3'>
          <h2 className="font-medium text-2xl break-words">{title}</h2>
        </div>
        <img src={banner} alt={banner} className='mb-3' />
        <div
          className="prose custom-prose break-words"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  );
};
