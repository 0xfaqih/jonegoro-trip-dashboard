// app/components/ui/DataCard.tsx
import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export function DataCard({ title, value, icon: Icon }: DataCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-black" />
      </div>
    </div>
  );
}
