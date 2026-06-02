"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useAuth } from "../providers/auth-provider";
import { fetchFamilyWishlists } from "@/lib/wishlist-data";
import type { FamilyWishlist } from "@/lib/types";

function LoginPrompt() {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <p className="text-muted-foreground mb-6">
        Inicia sesión para ver las listas de regalos de la familia.
      </p>
      <Button
        asChild
        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
      >
        <Link href="/login">Iniciar sesión</Link>
      </Button>
    </div>
  );
}

export function WishlistSection() {
  const { isLoggedIn, isAuthLoading } = useAuth();
  const [members, setMembers] = useState<FamilyWishlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWishlists = useCallback(async () => {
    if (!isLoggedIn) return;

    setLoading(true);
    setError(null);
    const result = await fetchFamilyWishlists();
    setLoading(false);

    if (result.error) {
      setError(result.error);
      setMembers([]);
      return;
    }

    setMembers(result.data);
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchWishlists = async () => {
      await loadWishlists();
    };
    void fetchWishlists();
  }, [loadWishlists]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Lista de deseos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comparte tus ideas de regalos para ayudar a los demas a encontrar el
            regalo perfecto para ti.
          </p>
        </div>

        {isAuthLoading ? (
          <p className="text-center text-muted-foreground py-12">Cargando sesión…</p>
        ) : !isLoggedIn ? (
          <LoginPrompt />
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 mb-8 max-w-2xl mx-auto text-center flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <span>{error}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={loading}
                  onClick={() => void loadWishlists()}
                  className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  Reintentar
                </Button>
              </div>
            )}

            {loading ? (
              <p className="text-center text-muted-foreground">Cargando listas…</p>
            ) : members.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Aún no hay listas de regalos registradas.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <Card
                    key={member.wishlistId}
                    className="bg-card border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader className="bg-primary/5 border-b border-border pb-4">
                      <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                        <span className="text-2xl">🎁</span>
                        {member.nombre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="min-h-[80px] text-sm sm:text-base text-foreground/80 leading-relaxed">
                        {member.regalos.length === 0 ? (
                          <p className="text-muted-foreground italic">
                            Sin regalos aún.
                          </p>
                        ) : (
                          <ul className="list-disc list-inside space-y-1">
                            {member.regalos.map((regalo) => (
                              <li key={regalo.regalo_id}>
                                {regalo.descripcion_regalo}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
