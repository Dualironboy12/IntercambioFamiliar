"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../providers/auth-provider";
import {
  addPlatillo,
  deletePlatillo,
  fetchFamilyPlatillos,
  fetchMyPlatillos,
} from "@/lib/potluck-data";
import type { FamilyPlatillo, PlatilloRow } from "@/lib/types";

type PotluckSectionProps = {
  scope?: "all" | "own";
};

function LoginPrompt() {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <p className="text-muted-foreground mb-6">
        Inicia sesión para ver el menú de la cena.
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

export function PotluckSection({ scope = "all" }: PotluckSectionProps) {
  const { isLoggedIn, isAuthLoading, userId, currentUser } = useAuth();
  const isOwnScope = scope === "own";
  const editable = isOwnScope && !!userId;

  const [familyItems, setFamilyItems] = useState<FamilyPlatillo[]>([]);
  const [ownItems, setOwnItems] = useState<PlatilloRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newDish, setNewDish] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    if (!isLoggedIn) return;
    if (isOwnScope && !userId) return;

    setLoading(true);
    setError(null);

    if (isOwnScope && userId) {
      const result = await fetchMyPlatillos(userId);
      setLoading(false);
      if (result.error) {
        setError(result.error);
        setOwnItems([]);
        return;
      }
      setOwnItems(result.data);
    } else {
      const result = await fetchFamilyPlatillos();
      setLoading(false);
      if (result.error) {
        setError(result.error);
        setFamilyItems([]);
        return;
      }
      setFamilyItems(result.data);
    }
  }, [isLoggedIn, isOwnScope, userId]);

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    void fetchData();
  }, [loadData]);

  const handleAdd = async () => {
    if (!userId || !newDish.trim()) return;

    setSubmitting(true);
    setError(null);
    const result = await addPlatillo(userId, newDish);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setNewDish("");
    setIsAdding(false);
    void loadData();
  };

  const handleDelete = async (platilloId: string) => {
    setSubmitting(true);
    setError(null);
    const result = await deletePlatillo(platilloId);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    void loadData();
  };

  const showLoginPrompt = !isAuthLoading && (!isLoggedIn || (isOwnScope && !userId));
  const showAuthLoading = isAuthLoading;

  const tableRows = isOwnScope
    ? ownItems.map((item) => ({
        id: item.platillo_id,
        nombre: currentUser?.name ?? "Tú",
        dish: item.descripcion_platillo,
      }))
    : familyItems.map((item) => ({
        id: item.platilloId,
        nombre: item.nombre,
        dish: item.descripcion_platillo,
      }));

  const sectionTitle = isOwnScope ? "Mis platillos" : "Platillos";
  const headerTitle = isOwnScope ? "Mi contribución a la cena" : "Menú de la cena de Navidad";
  const headerDescription = isOwnScope
    ? "Gestiona los platillos que traes a la cena."
    : "Aquí puedes encontrar los platillos que serviremos el día del intercambio y cena, ¡todos pueden colaborar con un platillo!";

  return (
    <section className={isOwnScope ? "py-8 sm:py-12" : "py-16 sm:py-20 lg:py-24"}>
      <div className={isOwnScope ? "max-w-4xl mx-auto" : "container mx-auto px-4 sm:px-6 lg:px-8"}>
        {isOwnScope && (
          <div className="text-center mb-8 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              {headerTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {headerDescription}
            </p>
          </div>
        )}

        {!isOwnScope && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              {headerTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {headerDescription}
            </p>
          </div>
        )}

        {showAuthLoading ? (
          <p className="text-center text-muted-foreground py-12">Cargando sesión…</p>
        ) : showLoginPrompt ? (
          <LoginPrompt />
        ) : (
          <Card
            className={`bg-card border-border rounded-2xl shadow-xl overflow-hidden ${isOwnScope ? "" : "max-w-4xl mx-auto"}`}
          >
            <CardHeader className="bg-primary/5 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                  <span className="text-2xl">🍽️</span>
                  {sectionTitle}
                </CardTitle>
                {editable && !isAdding && (
                  <Button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    disabled={submitting}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar platillo
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {error && (
                <div
                  role="alert"
                  className="text-sm text-destructive bg-destructive/10 border-b border-destructive/20 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                  <span>{error}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={loading || submitting}
                    onClick={() => void loadData()}
                    className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0"
                  >
                    Reintentar
                  </Button>
                </div>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border hover:bg-transparent">
                      {!isOwnScope && (
                        <TableHead className="text-foreground/70 font-semibold">
                          Trae
                        </TableHead>
                      )}
                      <TableHead className="text-foreground/70 font-semibold">
                        Platillo
                      </TableHead>
                      {editable && (
                        <TableHead className="text-foreground/70 font-semibold w-20" />
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={isOwnScope ? (editable ? 2 : 1) : editable ? 3 : 2}
                          className="text-center text-muted-foreground py-8"
                        >
                          Cargando platillos…
                        </TableCell>
                      </TableRow>
                    ) : tableRows.length === 0 && !isAdding ? (
                      <TableRow>
                        <TableCell
                          colSpan={isOwnScope ? (editable ? 2 : 1) : 2}
                          className="text-center text-muted-foreground py-8"
                        >
                          {isOwnScope
                            ? 'Sin platillos aún. Haz clic en "Agregar platillo" para empezar.'
                            : "Aún no hay platillos registrados."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      tableRows.map((item) => (
                        <TableRow
                          key={item.id}
                          className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                        >
                          {!isOwnScope && (
                            <TableCell className="font-medium text-foreground">
                              {item.nombre}
                            </TableCell>
                          )}
                          <TableCell className="text-foreground/80">
                            {item.dish}
                          </TableCell>
                          {editable && (
                            <TableCell>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                disabled={submitting}
                                onClick={() => void handleDelete(item.id)}
                                className="hover:bg-destructive/10 hover:text-destructive rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                    {isAdding && editable && (
                      <TableRow className="border-b border-border bg-muted/20">
                        <TableCell colSpan={isOwnScope ? 1 : 2}>
                          <Input
                            value={newDish}
                            onChange={(e) => setNewDish(e.target.value)}
                            placeholder="Nombre del platillo"
                            className="rounded-lg border-border"
                            disabled={submitting}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              disabled={submitting}
                              onClick={() => void handleAdd()}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg"
                            >
                              {submitting ? "Guardando…" : "Guardar"}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              disabled={submitting}
                              onClick={() => {
                                setIsAdding(false);
                                setNewDish("");
                              }}
                              className="rounded-lg"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
