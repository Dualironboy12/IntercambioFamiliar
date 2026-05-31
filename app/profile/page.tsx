"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfilePage } from "../components/profile-page";
import { useAuth } from "../providers/auth-provider";
import { devSkipAuth } from "@/lib/dev-flags";

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (devSkipAuth || isLoggedIn) return;
    router.replace("/login");
  }, [isLoggedIn, router]);

  if (!devSkipAuth && !isLoggedIn) return null;

  return (
    <main className="flex-1">
      <ProfilePage />
    </main>
  );
}
