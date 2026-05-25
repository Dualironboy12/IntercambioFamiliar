"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfilePage } from "../components/profile-page";
import { useAuth } from "../providers/auth-provider";

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <main className="flex-1">
      <ProfilePage />
    </main>
  );
}
