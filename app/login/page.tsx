"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "../components/login-page";
import { useAuth } from "../providers/auth-provider";
import { mapAuthError } from "@/lib/auth-errors";

function validateLoginForm(email: string, password: string): string | null {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "El correo electrónico es obligatorio.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return "Introduce un correo electrónico válido.";
  }

  if (!password) {
    return "La contraseña es obligatoria.";
  }

  return null;
}

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    router.replace("/profile");
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const validationMessage = validateLoginForm(email, password);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.error) {
      setError(mapAuthError(result.error));
      return;
    }

    router.push("/profile");
  };

  if (isLoggedIn) return null;

  return (
    <main className="flex-1">
      <LoginPage
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        loading={loading}
        error={error}
        validationError={validationError}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
