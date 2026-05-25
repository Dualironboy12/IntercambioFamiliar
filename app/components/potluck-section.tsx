"use client";

import { useState } from "react";
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

interface PotluckItem {
  id: string;
  name: string;
  dish: string;
  serves: string;
}

const initialItems: PotluckItem[] = [
  { id: "1", name: "Sarah", dish: "Roasted Turkey", serves: "8-10" },
  { id: "2", name: "Michael", dish: "Mashed Potatoes", serves: "8" },
  { id: "3", name: "Emma", dish: "Green Bean Casserole", serves: "6" },
  { id: "4", name: "David", dish: "Cranberry Sauce", serves: "10" },
  { id: "5", name: "Olivia", dish: "Apple Pie", serves: "8" },
  { id: "6", name: "James", dish: "Dinner Rolls", serves: "12" },
];

interface PotluckSectionProps {
  readOnly?: boolean;
}

export function PotluckSection({ readOnly = false }: PotluckSectionProps) {
  const [items, setItems] = useState<PotluckItem[]>(initialItems);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    const nameInput = document.getElementById("new-name") as HTMLInputElement;
    const dishInput = document.getElementById("new-dish") as HTMLInputElement;
    const servesInput = document.getElementById("new-serves") as HTMLInputElement;

    if (nameInput.value && dishInput.value) {
      const newItem: PotluckItem = {
        id: Date.now().toString(),
        name: nameInput.value,
        dish: dishInput.value,
        serves: servesInput.value || "4",
      };
      setItems([...items, newItem]);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Christmas Dinner Potluck
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Coordinate our festive feast. Sign up to bring your favorite holiday dish!
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-card border-border rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                Food Contributions
              </CardTitle>
              {!isAdding && !readOnly && (
                <Button
                  onClick={() => setIsAdding(true)}
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
                    <TableHead className="text-foreground/70 font-semibold">Name</TableHead>
                    <TableHead className="text-foreground/70 font-semibold">Dish</TableHead>
                    <TableHead className="text-foreground/70 font-semibold">Serves</TableHead>
                    {!readOnly && (
                      <TableHead className="text-foreground/70 font-semibold w-20" />
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium text-foreground">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-foreground/80">{item.dish}</TableCell>
                      <TableCell className="text-foreground/80">{item.serves}</TableCell>
                      {!readOnly && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="hover:bg-destructive/10 hover:text-destructive rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {isAdding && (
                    <TableRow className="border-b border-border bg-muted/20">
                      <TableCell>
                        <Input
                          id="new-name"
                          placeholder="Your name"
                          className="rounded-lg border-border"
                        />
                      </TableCell>
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
                            onClick={handleAdd}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsAdding(false)}
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
  );
}
