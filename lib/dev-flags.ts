/** When true, route auth guards are disabled and AuthProvider serves mock auth helpers for UI work. */
export const devSkipAuth = process.env.NEXT_PUBLIC_DEV_SKIP_AUTH === "true";
