import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Pastikan path ini benar
import { v4 as uuidv4 } from 'uuid';

export const useUploadBannerInfo = () => {
  const [uploading, setUploading] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadBanner = async (file: File) => {
    setUploading(true);
    setError(null);

    const uniqueId = `${uuidv4()}_${file.name}`;
    const { data, error } = await supabase
      .storage
      .from('image-tour')
      .upload(`blog-images/${uniqueId}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      setError(error.message);
      setUploading(false);
      return null;
    }

    const url = supabase
      .storage
      .from('image-tour')
      .getPublicUrl(`blog-images/${uniqueId}`)
      .data.publicUrl;

    setBannerUrl(url);
    setUploading(false);
    return url;
  };

  return { uploadBanner, uploading, bannerUrl, error };
};
