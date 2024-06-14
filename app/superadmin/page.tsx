"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useUserRole } from '@/hooks/useUserRole';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { toast } = useToast();
  const role = useUserRole();

  useEffect(() => {
    console.log('User role:', role); // Debugging log

    if (role === null) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);

    if (role !== 'SUPERADMIN') {
      router.push('/');
    }
  }, [role, router]);

  const handleEmailCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setEmailExists(data.exists);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailExists) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email sudah terdaftar",
      });
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      toast({
        variant: "success",
        title: "Success",
        description: "Berhasil menambahkan admin",
      });
      router.push('/');
    } else {
      const errorData = await res.json();
      toast({
        variant: "destructive",
        title: "Error",
        description: `Gagal menambahkan admin: ${errorData.message}`,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-2xl font-bold">Tambah admin</h1>
      <form onSubmit={handleAddAdmin} className="space-y-4 mt-4">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailCheck}
          required
        />
        {emailExists && <p className="text-red-500">Email sudah terdaftar</p>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={emailExists}>Tambahkan Admin</Button>
      </form>
    </div>
  );
}
