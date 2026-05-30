"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  wishlist: string;
}

const initialMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Sarah",
    wishlist:
      "• Cozy throw blanket\n• Coffee table book on architecture\n• Artisanal candles",
  },
  {
    id: "2",
    name: "Michael",
    wishlist: "• Wireless headphones\n• Fitness tracker\n• Cookbook for grilling",
  },
  {
    id: "3",
    name: "Emma",
    wishlist: "• Art supplies set\n• Journal with fountain pen\n• Yoga mat",
  },
  {
    id: "4",
    name: "David",
    wishlist: "• Board games\n• Premium coffee beans\n• Outdoor camping gear",
  },
  {
    id: "5",
    name: "Olivia",
    wishlist: "• Skincare set\n• Reading lamp\n• Plant terrarium kit",
  },
  {
    id: "6",
    name: "James",
    wishlist: "• Tech gadget organizer\n• Book series\n• Running shoes",
  },
];

interface WishlistSectionProps {
  readOnly?: boolean;
}

export function WishlistSection({ readOnly = false }: WishlistSectionProps) {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (id: string, newWishlist: string) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, wishlist: newWishlist } : m)));
    setEditingId(null);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Lista de deseos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comparte tus ideas de regalos para ayudar a los demas a encontrar el regalo perfecto para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card
              key={member.id}
              className="bg-card border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="bg-primary/5 border-b border-border pb-4">
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                  <span className="text-2xl">🎁</span>
                  {member.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {editingId === member.id ? (
                  <div className="space-y-4">
                    <Textarea
                      defaultValue={member.wishlist}
                      className="min-h-[160px] rounded-xl border-border resize-none"
                      id={`wishlist-${member.id}`}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          const textarea = document.getElementById(
                            `wishlist-${member.id}`
                          ) as HTMLTextAreaElement;
                          handleSave(member.id, textarea.value);
                        }}
                        className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingId(null)}
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="min-h-[160px] text-sm sm:text-base text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {member.wishlist}
                    </div>
                    {!readOnly && (
                      <Button
                        variant="outline"
                        onClick={() => setEditingId(member.id)}
                        className="w-full rounded-xl border-primary/20 hover:border-primary hover:bg-primary/5"
                      >
                        Edit Wishlist
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
