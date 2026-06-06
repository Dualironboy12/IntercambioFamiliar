"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ResetPasswordPage } from "../components/reset-password-page";
import { useAuth } from "../providers/auth-provider";
import { mapAuthError } from "@/lib/auth-errors";

function validateResetPasswordForm(
  password: string,
  confirmPassword: string
): string | null {
  if (!password) {
    return "La contraseña es obligatoria.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden.";
  }

  return null;
}

export default function ResetPassword() {
  const { isLoggedIn, isAuthLoading, updatePassword } = useAuth();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const validationMessage = validateResetPasswordForm(password, confirmPassword);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setLoading(true);
    const result = await updatePassword(password);
    setLoading(false);

    if (result.error) {
      setError(mapAuthError(result.error));
      return;
    }

    router.push("/profile");
  };

  if (isAuthLoading) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <p className="text-muted-foreground">Cargando sesión…</p>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <ResetPasswordPage
        password={password}
        confirmPassword={confirmPassword}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        loading={loading}
        error={error}
        validationError={validationError}
        invalidSession={!isLoggedIn}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
