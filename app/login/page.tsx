"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "../components/login-page";
import { useAuth } from "../providers/auth-provider";
import { devSkipAuth } from "@/lib/dev-flags";

export default function Login() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (devSkipAuth || !isLoggedIn) return;
    router.replace("/profile");
  }, [isLoggedIn, router]);

  if (!devSkipAuth && isLoggedIn) return null;

  return (
    <main className="flex-1">
      <LoginPage />
    </main>
  );
}
