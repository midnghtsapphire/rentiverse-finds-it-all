import { Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  {
    icon: Compass,
    title: "Find what ownership made inconvenient",
    description:
      "From tools to formalwear to creator gear, Rentiverse is built for the moments when buying makes less sense than borrowing nearby.",
  },
  {
    icon: ShieldCheck,
    title: "Shape demand before full marketplace scale",
    description:
      "A curated launch catalog keeps the site useful while live listings, partners, and operational trust systems come online.",
  },
  {
    icon: Sparkles,
    title: "Make discovery feel editorial, not cluttered",
    description:
      "Category-first browsing, real use cases, and clear listing details help renters discover options faster than generic classifieds.",
  },
];

const MarketplaceHighlights = () => (
  <section className="container mx-auto px-4 py-16" aria-label="Rentiverse positioning highlights">
    <div className="grid gap-6 md:grid-cols-3">
      {highlights.map(({ icon: Icon, title, description }) => (
        <Card key={title} className="border-border/60 shadow-sm">
          <CardHeader>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">{description}</CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default MarketplaceHighlights;
