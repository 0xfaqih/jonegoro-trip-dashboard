"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Customize your loading indicator
  }

  return <>{children}</>;
}
