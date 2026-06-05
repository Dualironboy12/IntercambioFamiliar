"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ACCOUNT_NOT_FOUND_MESSAGE } from "@/lib/auth-errors";

type LoginPageProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  loading: boolean;
  error: string | null;
  validationError: string | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function LoginPage({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  loading,
  error,
  validationError,
  onSubmit,
}: LoginPageProps) {
  const router = useRouter();
  const displayError = validationError ?? error;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <Card className="w-full max-w-md bg-card border-border rounded-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-3xl mx-auto mb-4">
            🎄
          </div>
          <CardTitle className="text-2xl sm:text-3xl text-foreground">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Inicia sesión para ver tu lista de regalos y platos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {displayError && (
              <p
                role="alert"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
              >
                {displayError === ACCOUNT_NOT_FOUND_MESSAGE ? (
                  <>
                    Correo electrónico o contraseña incorrectos. Revisa tus datos o{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/signup")}
                      className="underline font-semibold"
                      disabled={loading}
                    >
                      regístrate
                    </button>
                    .
                  </>
                ) : (
                  displayError
                )}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="rounded-xl border-border"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="rounded-xl border-border"
                required
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl mt-6 disabled:opacity-60"
            >
              {loading ? "Iniciando sesión…" : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="text-destructive hover:underline font-semibold"
                disabled={loading}
              >
                Registrarse
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
