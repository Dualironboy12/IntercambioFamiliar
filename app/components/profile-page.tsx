"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Save, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../providers/auth-provider";

interface PotluckItem {
  id: string;
  dish: string;
}

export function ProfilePage() {
  const router = useRouter();
  const { currentUser, deleteAccount } = useAuth();
  const userName = currentUser?.name ?? "User";

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const initialWishlist =
    userName === "Sarah"
      ? "• Cozy throw blanket\n• Coffee table book on architecture\n• Artisanal candles"
      : "• Your wishlist items here";

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [isEditingWishlist, setIsEditingWishlist] = useState(false);

  const initialContributions: PotluckItem[] =
    userName === "Sarah"
      ? [{ id: "1", dish: "Roasted Turkey" }]
      : [];

  const [contributions, setContributions] =
    useState<PotluckItem[]>(initialContributions);
  const [isAddingContribution, setIsAddingContribution] = useState(false);

  const handleSaveWishlist = () => {
    const textarea = document.getElementById(
      "user-wishlist"
    ) as HTMLTextAreaElement;
    setWishlist(textarea.value);
    setIsEditingWishlist(false);
  };

  const handleAddContribution = () => {
    const dishInput = document.getElementById("new-dish") as HTMLInputElement;

    if (dishInput.value) {
      const newItem: PotluckItem = {
        id: Date.now().toString(),
        dish: dishInput.value,
      };
      setContributions([...contributions, newItem]);
      setIsAddingContribution(false);
    }
  };

  const handleDeleteContribution = (id: string) => {
    setContributions(contributions.filter((item) => item.id !== id));
  };

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
        {/* Profile Header */}
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
                  Proximamente
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  Dias hasta el intercambio
                </h3>
                <p className="text-xl sm:text-2xl font-semibold text-destructive">
                  Proximamente
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                Mi lista de regalos
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Comparte tus ideas de regalos para ayudar a los demas a encontrar el regalo perfecto para ti.
              </p>
            </div>

            <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-lg">
              <CardHeader className="bg-primary/5 border-b border-border pb-4">
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                  Lista de regalos de {userName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isEditingWishlist ? (
                  <div className="space-y-4">
                    <Textarea
                      id="user-wishlist"
                      defaultValue={wishlist}
                      className="min-h-[160px] rounded-xl border-border resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveWishlist}
                        className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingWishlist(false)}
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="min-h-[160px] text-sm sm:text-base text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {wishlist}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingWishlist(true)}
                      className="w-full rounded-xl border-primary/20 hover:border-primary hover:bg-primary/5"
                    >
                      Editar lista de regalos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Potluck Contributions Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                Mi contribución a la cena
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Gestiona los platillos que traes a la cena.
              </p>
            </div>

            <Card className="bg-card border-border rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                    Mis platillos
                  </CardTitle>
                  {!isAddingContribution && (
                    <Button
                      onClick={() => setIsAddingContribution(true)}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar platillo
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-border hover:bg-transparent">
                        <TableHead className="text-foreground/70 font-semibold">
                          Platillos
                        </TableHead>
                        <TableHead className="text-foreground/70 font-semibold w-20" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributions.length === 0 && !isAddingContribution ? (
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            className="text-center text-muted-foreground py-8"
                          >
                            Sin platillos aún. Haz clic en "Agregar platillo" para empezar.
                          </TableCell>
                        </TableRow>
                      ) : (
                        contributions.map((item) => (
                          <TableRow
                            key={item.id}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <TableCell className="font-medium text-foreground">
                              {item.dish}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteContribution(item.id)
                                }
                                className="hover:bg-destructive/10 hover:text-destructive rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                      {isAddingContribution && (
                        <TableRow className="border-b border-border bg-muted/20">
                          <TableCell>
                            <Input
                              id="new-dish"
                              placeholder="Dish name"
                              className="rounded-lg border-border"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleAddContribution}
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsAddingContribution(false)}
                                className="rounded-lg"
                              >
                                Cancel
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
          </div>
        </section>

        {/* Danger zone — delete account */}
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
