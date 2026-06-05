"use client";

import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";

type ConfirmEmailPageProps = {
  email: string;
};

export function ConfirmEmailPage({ email }: ConfirmEmailPageProps) {
  const router = useRouter();

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
            Te enviamos un enlace de confirmación a{" "}
            <span className="font-semibold text-foreground">{email}</span>.
            Haz clic en él para activar tu cuenta.
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
            Ir a iniciar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
