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

type ResetPasswordPageProps = {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  loading: boolean;
  error: string | null;
  validationError: string | null;
  invalidSession: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function ResetPasswordPage({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  loading,
  error,
  validationError,
  invalidSession,
  onSubmit,
}: ResetPasswordPageProps) {
  const router = useRouter();
  const displayError = validationError ?? error;

  if (invalidSession) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <Card className="w-full max-w-md bg-card border-border rounded-2xl shadow-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-3xl mx-auto mb-4">
              🎄
            </div>
            <CardTitle className="text-2xl sm:text-3xl text-foreground">
              Enlace no válido
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Este enlace de recuperación ha expirado o ya no es válido. Solicita
              uno nuevo para restablecer tu contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
            >
              Solicitar nuevo enlace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <Card className="w-full max-w-md bg-card border-border rounded-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-3xl mx-auto mb-4">
            🎄
          </div>
          <CardTitle className="text-2xl sm:text-3xl text-foreground">
            Nueva contraseña
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Elige una nueva contraseña para tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {displayError && (
              <p
                role="alert"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
              >
                {displayError}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Nueva contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="rounded-xl border-border"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground">
                Confirmar contraseña
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                className="rounded-xl border-border"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl mt-6 disabled:opacity-60"
            >
              {loading ? "Guardando…" : "Guardar contraseña"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
