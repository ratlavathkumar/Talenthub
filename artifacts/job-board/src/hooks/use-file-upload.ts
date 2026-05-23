import { useState } from "react";

interface UploadResult {
  objectPath: string;
  serveUrl: string;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    setIsUploading(true);
    setProgress(0);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 80));
        }
      };

      reader.onload = () => {
        setProgress(100);
        setIsUploading(false);
        const dataUrl = reader.result as string;
        resolve({
          objectPath: dataUrl,
          serveUrl: dataUrl,
        });
      };

      reader.onerror = () => {
        setIsUploading(false);
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  };

  return { uploadFile, isUploading, progress };
}
