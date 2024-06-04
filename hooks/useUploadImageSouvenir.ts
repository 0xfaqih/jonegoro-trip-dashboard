import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Pastikan path ini benar
import { v4 as uuidv4 } from 'uuid';

export const useUploadImageSouvenir = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setUploading(true);
    setError(null);

    const uniqueId = `${uuidv4()}_${file.name}`;
    const { data, error } = await supabase
      .storage
      .from('image-tour')
      .upload(`souvenir-images/${uniqueId}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      setError(error.message);
      setUploading(false);
      return null;
    }

    const url = supabase
      .storage
      .from('image-tour')
      .getPublicUrl(`souvenir-images/${uniqueId}`)
      .data.publicUrl;

    setImageUrl(url);
    setUploading(false);
    return url;
  };

  return { uploadImage, uploading, imageUrl, error };
};
