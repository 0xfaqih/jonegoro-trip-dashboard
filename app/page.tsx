import React from 'react';
import { DashboardData } from '@/components/DashboardData';

export default function DashboardPage() {
  return (
    <div className="p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Dashboard JonegoroTrip</h1>
      <DashboardData />
    </div>
  );
}
