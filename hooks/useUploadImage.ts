import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const useUploadImages = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImagesToSupabase = async (files: File[]): Promise<string[]> => {
    setIsLoading(true);
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const uniqueId = `${uuidv4()}_${file.name}`;
        const { data, error } = await supabase
          .storage
          .from('image-tour')
          .upload(`public/${uniqueId}`, file);

        if (error) {
          console.error('Error uploading image:', error);
          return '';
        }

        const url = supabase
          .storage
          .from('image-tour')
          .getPublicUrl(`public/${uniqueId}`)
          .data.publicUrl;

        return url;
      })
    );
    setIsLoading(false);
    return uploadedUrls.filter((url) => url !== '');
  };

  return { uploadImagesToSupabase, isLoading };
};
