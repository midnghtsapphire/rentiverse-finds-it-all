import { BadgeCheck, Clock3, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trustPrinciples } from "@/data/marketplace";

const icons = [BadgeCheck, Clock3, Truck];

const TrustSection = () => (
  <section id="trust" className="bg-slate-950 py-16 text-white">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Trust, operations, and launch quality
        </p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Built for reliable local renting</h2>
        <p className="text-base text-slate-300 md:text-lg">
          Rentiverse should feel dependable even before the marketplace reaches scale. These operating principles keep the launch experience credible.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {trustPrinciples.map((item, index) => {
          const Icon = icons[index];

          return (
            <Card key={item.title} className="border-white/10 bg-white/5 text-white shadow-none">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">{item.description}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustSection;
