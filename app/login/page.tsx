"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading || isAuthenticated) {
    return <Loading isLoading={loading} />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[url('/logo-pinarak.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="backdrop-gradient p-8 rounded-lg shadow-xl max-w-md w-full">
          <Card className="w-full shadow-none bg-white">
            <CardHeader>
              <CardTitle >Login</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
