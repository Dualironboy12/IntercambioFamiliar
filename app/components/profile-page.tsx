"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "../providers/auth-provider";
import { useCountdown } from "@/lib/event-date";
import { MyWishlistEditor } from "./my-wishlist-editor";
import { PotluckSection } from "./potluck-section";

export function ProfilePage() {
  const router = useRouter();
  const { currentUser, deleteAccount } = useAuth();
  const { days, hours, minutes, seconds } = useCountdown();
  const userName = currentUser?.name ?? "User";

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    setDeleteError(null);
    setDeleteLoading(true);
    const result = await deleteAccount();
    setDeleteLoading(false);

    if (result.error) {
      setDeleteError(result.error);
      return;
    }

    router.push("/");
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-card border-border rounded-2xl p-6 sm:p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center text-3xl sm:text-4xl">
                👤
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
                  Bienvenido, {userName}!
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">
                  Gestiona tu lista de regalos y platos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  Te toca dar el regalo a...
                </h3>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  Próximamente
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  Días hasta el intercambio
                </h3>
                <p className="text-xl sm:text-2xl font-semibold text-destructive tabular-nums">
                  {String(days).padStart(2, "0")}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
                </p>
              </div>
            </div>
          </div>
        </div>

        <MyWishlistEditor />
        <PotluckSection scope="own" />

        <section className="py-8 sm:py-12 border-t border-border mt-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Zona de peligro
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Eliminar tu cuenta borra de forma permanente tu perfil, lista de
              regalos y platillos. Esta acción no se puede deshacer.
            </p>

            {deleteError && (
              <p
                role="alert"
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 mb-4"
              >
                {deleteError}
              </p>
            )}

            {showDeleteConfirm ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  disabled={deleteLoading}
                  onClick={handleConfirmDelete}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl disabled:opacity-60"
                >
                  {deleteLoading ? "Eliminando cuenta…" : "Confirmar borrado"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={deleteLoading}
                  onClick={handleCancelDelete}
                  className="rounded-xl"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Borrar cuenta
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
