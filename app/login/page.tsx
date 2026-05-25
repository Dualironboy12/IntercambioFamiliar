"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "../components/login-page";
import { useAuth } from "../providers/auth-provider";

export default function Login() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return (
    <main className="flex-1">
      <LoginPage />
    </main>
  );
}
