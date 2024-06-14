import { FC } from "react";
import { Loader } from "lucide-react"; 

interface LoadingProps {
  isLoading: boolean;
}

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin h-10 w-10 text-primary" />
      <span className="ml-2 text-lg">Harap tunggu...</span>
    </div>
  );
};

export default Loading;