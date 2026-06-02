"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SignupPage } from "../components/signup-page";
import { useAuth } from "../providers/auth-provider";
import { mapAuthError } from "@/lib/auth-errors";

function validateSignupForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): string | null {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    return "El nombre es obligatorio.";
  }

  if (!trimmedEmail) {
    return "El correo electrónico es obligatorio.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return "Introduce un correo electrónico válido.";
  }

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

export default function Signup() {
  const { isLoggedIn, isAuthLoading, signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLoggedIn) return;
    router.replace("/profile");
  }, [isLoggedIn, isAuthLoading, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const validationMessage = validateSignupForm(
      name,
      email,
      password,
      confirmPassword
    );
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setLoading(true);
    const result = await signup(name.trim(), email.trim(), password);
    setLoading(false);

    if (result.error) {
      setError(mapAuthError(result.error));
      return;
    }

    router.push("/profile");
  };

  if (isAuthLoading || isLoggedIn) return null;

  return (
    <main className="flex-1">
      <SignupPage
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        loading={loading}
        error={error}
        validationError={validationError}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
