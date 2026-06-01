import { Gift, DollarSign, Calendar, Lock } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const rules = [
  {
    icon: Gift,
    title: "Sorteo de Participantes",
    description:
      "Se realizará un sorteo entre los participantes para determinar quién debe regalar a quién.",
  },
  {
    icon: DollarSign,
    title: "Límite de presupuesto",
    description:
      "Este año el límite de presupuesto será de $500.",
  },
  {
    icon: Calendar,
    title: "Fecha del Intercambio",
    description:
      "El intercambio se realizará el día de navidad, 25 de diciembre.",
  },
  {
    icon: Lock,
    title: "¡Mantén el secreto!",
    description:
      "Asegúrate de mantener el secreto de a quién le regalas hasta el día del intercambio.",
  },
];

export function RulesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Reglas del Intercambio
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Revisa las reglas para asegurar una experiencia divertida y justa para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule) => (
            <Card
              key={rule.title}
              className="bg-card border-border hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <rule.icon className="w-7 h-7 text-accent" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                  {rule.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
