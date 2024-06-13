"use client";

import { useState, useEffect } from 'react';

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/role`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        console.log('User role:', data.role); // Tambahkan debug statement
        setRole(data.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    }

    fetchUserRole();
  }, []);

  return role;
}
