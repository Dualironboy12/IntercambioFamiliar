"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfilePage } from "../components/profile-page";
import { useAuth } from "../providers/auth-provider";

export default function Profile() {
  const { isLoggedIn, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading) return;
    if (isLoggedIn) return;
    router.replace("/login");
  }, [isLoggedIn, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <p className="text-muted-foreground">Cargando sesión…</p>
      </main>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <main className="flex-1">
      <ProfilePage />
    </main>
  );
}
