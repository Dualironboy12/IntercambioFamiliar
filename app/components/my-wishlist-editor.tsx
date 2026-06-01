"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { useAuth } from "../providers/auth-provider";
import {
  addRegalo,
  deleteRegalo,
  fetchMyWishlist,
  updateRegalo,
} from "@/lib/wishlist-data";
import type { RegaloRow } from "@/lib/types";

export function MyWishlistEditor() {
  const { userId, currentUser } = useAuth();
  const userName = currentUser?.name ?? "Usuario";

  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const [regalos, setRegalos] = useState<RegaloRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGift, setNewGift] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingRegaloId, setEditingRegaloId] = useState<string | null>(null);
  const [editedRegaloText, setEditedRegaloText] = useState("");

  const loadWishlist = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    const result = await fetchMyWishlist(userId);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      setWishlistId(null);
      setRegalos([]);
      return;
    }

    if (!result.data) {
      setWishlistId(null);
      setRegalos([]);
      return;
    }

    setWishlistId(result.data.wishlistId);
    setRegalos(result.data.regalos);
  }, [userId]);

  useEffect(() => {
    const fetchWishlist = async () => {
      await loadWishlist();
    };
    void fetchWishlist();
  }, [loadWishlist]);

  const handleAdd = async () => {
    if (!wishlistId || !newGift.trim()) return;

    setSubmitting(true);
    setError(null);
    const result = await addRegalo(wishlistId, newGift);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setNewGift("");
    void loadWishlist();
  };

  const handleDelete = async (regaloId: string) => {
    setSubmitting(true);
    setError(null);
    const result = await deleteRegalo(regaloId);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    void loadWishlist();
  };

  const handleEdit = (regalo: RegaloRow) => {
    setEditingRegaloId(regalo.regalo_id);
    setEditedRegaloText(regalo.descripcion_regalo);
  };

  const handleEditSave = async (regaloId: string) => {
    if (!editedRegaloText.trim()) return;

    setSubmitting(true);
    setError(null);
    const result = await updateRegalo(regaloId, editedRegaloText);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setEditingRegaloId(null);
    setEditedRegaloText("");
    void loadWishlist();
  };

  const handleEditCancel = () => {
    setEditingRegaloId(null);
    setEditedRegaloText("");
  };

  if (!userId) {
    return (
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <p className="text-center text-muted-foreground">
            No se pudo cargar tu lista de regalos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Mi lista de regalos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Comparte tus ideas de regalos para ayudar a los demas a encontrar el
            regalo perfecto para ti.
          </p>
        </div>

        <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-lg mx-4 sm:mx-0">
          <CardHeader className="bg-primary/5 border-b border-border pb-4">
            <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              Lista de regalos de {userName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {error && (
              <div
                role="alert"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
              >
                <span>{error}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={loading || submitting}
                  onClick={() => void loadWishlist()}
                  className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0"
                >
                  Reintentar
                </Button>
              </div>
            )}

            {loading ? (
              <p className="text-muted-foreground text-sm">Cargando regalos…</p>
            ) : regalos.length === 0 ? (
              <p className="text-muted-foreground text-sm italic">
                Sin regalos aún. Agrega tu primera idea abajo.
              </p>
            ) : (
              <ul className="space-y-2">
                {regalos.map((regalo) => (
                  <li
                    key={regalo.regalo_id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 bg-muted/20"
                  >
                    {editingRegaloId === regalo.regalo_id ? (
                      <Input
                        value={editedRegaloText}
                        onChange={(e) => setEditedRegaloText(e.target.value)}
                        className="flex-grow rounded-lg border-border"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void handleEditSave(regalo.regalo_id);
                          } else if (e.key === "Escape") {
                            handleEditCancel();
                          }
                        }}
                        disabled={submitting}
                      />
                    ) : (
                      <span className="text-foreground text-sm sm:text-base">
                        {regalo.descripcion_regalo}
                      </span>
                    )}
                    <div className="flex gap-2 shrink-0">
                      {editingRegaloId === regalo.regalo_id ? (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={submitting}
                            onClick={() => void handleEditSave(regalo.regalo_id)}
                            className="hover:bg-green-500/10 hover:text-green-500 rounded-lg"
                            aria-label="Guardar cambio"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={submitting}
                            onClick={handleEditCancel}
                            className="hover:bg-red-500/10 hover:text-red-500 rounded-lg"
                            aria-label="Cancelar edición"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={submitting}
                          onClick={() => handleEdit(regalo)}
                          className="hover:bg-primary/10 hover:text-primary rounded-lg"
                          aria-label="Editar regalo"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={submitting}
                        onClick={() => void handleDelete(regalo.regalo_id)}
                        className="shrink-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
                        aria-label="Eliminar regalo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Input
                value={newGift}
                onChange={(e) => setNewGift(e.target.value)}
                placeholder="Idea de regalo"
                className="rounded-xl border-border"
                disabled={submitting || !wishlistId}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void handleAdd();
                  }
                }}
              />
              <Button
                type="button"
                disabled={submitting || !wishlistId || !newGift.trim()}
                onClick={() => void handleAdd()}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl sm:shrink-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                {submitting ? "Agregando…" : "Agregar regalo"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
