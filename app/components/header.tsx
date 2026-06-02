"use client";

import { User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";

export function Header() {
  const { isLoggedIn, isAuthLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-lg">🎄</span>
            </div>
            <h1 className="text-lg sm:text-xl text-primary-foreground font-semibold tracking-tight">
              Intercambio Familiar
            </h1>
          </Link>

          <div className="flex items-center gap-2">
            {isAuthLoading ? (
              <span className="text-sm text-primary-foreground/60">
                Cargando sesión…
              </span>
            ) : isLoggedIn ? (
              <>
                {pathname !== "/profile" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/profile")}
                    className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push("/signup")}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
