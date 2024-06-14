import { FC } from "react";
import { Loader } from "lucide-react";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10 text-primary text-white" />
        <span className="ml-2 text-lg text-white">Harap tunggu...</span>
      </div>
    </div>
  );
};

export default Loading;
