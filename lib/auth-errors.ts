/**
 * Maps raw Supabase Auth error messages to user-friendly Spanish strings.
 *
 * Supabase ships English-only messages; this helper keeps the UI consistent
 * with the rest of the Spanish-first experience. Unknown messages pass through
 * unchanged so unexpected errors are never hidden.
 */

const AUTH_ERROR_MAP: Record<string, string> = {
  "Invalid login credentials.": "Correo o contraseña incorrectos.",
  "Email not confirmed":
    "Tu correo aún no está confirmado. Revisa tu bandeja de entrada.",
  "A user with this email address has already been registered.":
    "Este correo ya está registrado. Intenta iniciar sesión.",
  "Password should be at least 6 characters":
    "La contraseña debe tener al menos 6 caracteres.",
  "Too many requests. Please try again later.":
    "Demasiados intentos. Intenta de nuevo más tarde.",
  "Email rate limit exceeded":
    "Se alcanzó el límite de correos enviados. Intenta de nuevo en unos minutos.",
  "Signups not allowed for this instance":
    "El registro de nuevas cuentas está deshabilitado.",
};

export function mapAuthError(raw: string): string {
  // Exact match first
  if (raw in AUTH_ERROR_MAP) return AUTH_ERROR_MAP[raw];

  // Partial / case-insensitive fallback for messages that include extra context
  const lower = raw.toLowerCase();
  for (const [key, value] of Object.entries(AUTH_ERROR_MAP)) {
    if (lower.includes(key.toLowerCase())) return value;
  }

  return raw;
}
