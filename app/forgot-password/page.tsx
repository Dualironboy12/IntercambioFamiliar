"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ForgotPasswordPage } from "../components/forgot-password-page";
import { useAuth } from "../providers/auth-provider";
import { mapAuthError } from "@/lib/auth-errors";

function validateForgotPasswordForm(email: string): string | null {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "El correo electrónico es obligatorio.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return "Introduce un correo electrónico válido.";
  }

  return null;
}

export default function ForgotPassword() {
  const { isLoggedIn, isAuthLoading, requestPasswordReset } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLoggedIn) return;
    router.replace("/profile");
  }, [isLoggedIn, isAuthLoading, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const validationMessage = validateForgotPasswordForm(email);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setLoading(true);
    const result = await requestPasswordReset(email.trim());
    setLoading(false);

    if (result.error) {
      setError(mapAuthError(result.error));
      return;
    }

    setSubmitted(true);
  };

  if (isAuthLoading || isLoggedIn) return null;

  return (
    <main className="flex-1">
      <ForgotPasswordPage
        email={email}
        onEmailChange={setEmail}
        loading={loading}
        error={error}
        validationError={validationError}
        submitted={submitted}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
