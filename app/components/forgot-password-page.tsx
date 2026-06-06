"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Mail } from "lucide-react";
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

type ForgotPasswordPageProps = {
  email: string;
  onEmailChange: (value: string) => void;
  loading: boolean;
  error: string | null;
  validationError: string | null;
  submitted: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function ForgotPasswordPage({
  email,
  onEmailChange,
  loading,
  error,
  validationError,
  submitted,
  onSubmit,
}: ForgotPasswordPageProps) {
  const router = useRouter();
  const displayError = validationError ?? error;

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <Card className="w-full max-w-md bg-card border-border rounded-2xl shadow-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-foreground" aria-hidden />
            </div>
            <CardTitle className="text-2xl sm:text-3xl text-foreground">
              Revisa tu correo
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Te enviamos un enlace para restablecer tu contraseña a{" "}
              <span className="font-semibold text-foreground">{email.trim()}</span>.
              Haz clic en él para crear una nueva contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground text-center">
              Si no ves el correo, revisa tu carpeta de spam.
            </p>
            <Button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
            >
              Volver a iniciar sesión
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
            Recuperar contraseña
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Introduce tu correo y te enviaremos un enlace para restablecer tu
            contraseña.
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
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl mt-6 disabled:opacity-60"
            >
              {loading ? "Enviando…" : "Enviar enlace de recuperación"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-destructive hover:underline font-semibold"
                disabled={loading}
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
