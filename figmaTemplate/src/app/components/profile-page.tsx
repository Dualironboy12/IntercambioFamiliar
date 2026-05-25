import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Save, Plus, Trash2 } from "lucide-react";

interface ProfilePageProps {
  userName: string;
}

interface PotluckItem {
  id: string;
  dish: string;
  serves: string;
}

export function ProfilePage({ userName }: ProfilePageProps) {
  // Mock user wishlist data - in a real app, this would come from the backend
  const initialWishlist = userName === "Sarah"
    ? "• Cozy throw blanket\n• Coffee table book on architecture\n• Artisanal candles"
    : "• Your wishlist items here";

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [isEditingWishlist, setIsEditingWishlist] = useState(false);

  // Mock user potluck contributions - in a real app, this would come from the backend
  const initialContributions = userName === "Sarah"
    ? [{ id: "1", dish: "Roasted Turkey", serves: "8-10" }]
    : [];

  const [contributions, setContributions] = useState<PotluckItem[]>(initialContributions);
  const [isAddingContribution, setIsAddingContribution] = useState(false);

  const handleSaveWishlist = () => {
    const textarea = document.getElementById("user-wishlist") as HTMLTextAreaElement;
    setWishlist(textarea.value);
    setIsEditingWishlist(false);
  };

  const handleAddContribution = () => {
    const dishInput = document.getElementById("new-dish") as HTMLInputElement;
    const servesInput = document.getElementById("new-serves") as HTMLInputElement;

    if (dishInput.value) {
      const newItem: PotluckItem = {
        id: Date.now().toString(),
        dish: dishInput.value,
        serves: servesInput.value || "4",
      };
      setContributions([...contributions, newItem]);
      setIsAddingContribution(false);
    }
  };

  const handleDeleteContribution = (id: string) => {
    setContributions(contributions.filter(item => item.id !== id));
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
                  Welcome Back, {userName}!
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">
                  Manage your wishlist and potluck contributions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Secret Santa</h3>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">Not Assigned Yet</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Days Until Christmas</h3>
                <p className="text-xl sm:text-2xl font-semibold text-destructive">Coming Soon!</p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Wishlist Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                My Wishlist
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Share your gift ideas with your Secret Santa
              </p>
            </div>

            <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-lg">
              <CardHeader className="bg-primary/5 border-b border-border pb-4">
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                  <span className="text-2xl">🎁</span>
                  {userName}'s Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isEditingWishlist ? (
                  <div className="space-y-4">
                    <Textarea
                      id="user-wishlist"
                      defaultValue={wishlist}
                      className="min-h-[160px] rounded-xl border-border focus:ring-accent focus:border-accent resize-none"
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
                      Edit Wishlist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User's Potluck Contributions Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                My Dinner Contributions
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Manage what you're bringing to the Christmas dinner
              </p>
            </div>

            <Card className="bg-card border-border rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                    <span className="text-2xl">🍽️</span>
                    My Food Contributions
                  </CardTitle>
                  {!isAddingContribution && (
                    <Button
                      onClick={() => setIsAddingContribution(true)}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Dish
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-border hover:bg-transparent">
                        <TableHead className="text-foreground/70 font-semibold">Dish</TableHead>
                        <TableHead className="text-foreground/70 font-semibold">Serves</TableHead>
                        <TableHead className="text-foreground/70 font-semibold w-20"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributions.length === 0 && !isAddingContribution ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                            No contributions yet. Click "Add Dish" to get started!
                          </TableCell>
                        </TableRow>
                      ) : (
                        contributions.map((item) => (
                          <TableRow
                            key={item.id}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <TableCell className="font-medium text-foreground">{item.dish}</TableCell>
                            <TableCell className="text-foreground/80">{item.serves}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteContribution(item.id)}
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
                            <Input
                              id="new-serves"
                              placeholder="Serves"
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
      </div>
    </div>
  );
}
