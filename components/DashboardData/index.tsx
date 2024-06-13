"use client"

import React, { useEffect, useState } from 'react';
import { DataCard } from '../DataCard';
import { Icons } from '../icons';

const fetchWisata = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`);
  const result = await response.json();
  return result.data;
};

const fetchOlehOleh = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/souvenirs`);
  const result = await response.json();
  return result.data;
};

const fetchAkomodasi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accommodations`);
  const result = await response.json();
  return result.data;
};

const fetchInformasi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  const result = await response.json();
  return result.data;
};

export function DashboardData() {
  const [wisata, setWisata] = useState(0);
  const [olehOleh, setOlehOleh] = useState(0);
  const [akomodasi, setAkomodasi] = useState(0);
  const [informasi, setInformasi] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const [wisataData, olehOlehData, akomodasiData, informasiData] = await Promise.all([
        fetchWisata(),
        fetchOlehOleh(),
        fetchAkomodasi(),
        fetchInformasi(),
      ]);

      setWisata(wisataData.length);
      setOlehOleh(olehOlehData.length);
      setAkomodasi(akomodasiData.length);
      setInformasi(informasiData.length);
    };

    loadData();
  }, []);

  return (
    <div className="mx-auto col-span-2 grid grid-cols-2 gap-6 lg:grid-cols-4">
      <DataCard title="Wisata" value={wisata.toString()} icon={Icons.tour} />
      <DataCard title="Oleh Oleh" value={olehOleh.toString()} icon={Icons.sovenir} />
      <DataCard title="Akomodasi" value={akomodasi.toString()} icon={Icons.accommodation} />
      <DataCard title="Informasi" value={informasi.toString()} icon={Icons.info} />
    </div>
  );
}
