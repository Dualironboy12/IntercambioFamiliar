"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignupPage } from "../components/signup-page";
import { useAuth } from "../providers/auth-provider";

export default function Signup() {
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
      <SignupPage />
    </main>
  );
}
