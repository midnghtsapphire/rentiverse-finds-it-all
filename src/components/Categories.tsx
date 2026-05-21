
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketplaceCategories } from "@/data/marketplace";

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const Categories = ({ onSelectCategory }: CategoriesProps) => {
  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    document.getElementById("featured-listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="categories" className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Browse by category
        </p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Start with the highest-intent rental moments</h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Rentiverse launches best when people can immediately spot the categories where access beats ownership. These curated entry points help the marketplace feel intentional from day one.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {marketplaceCategories.map((category) => (
          <article
            key={category.name}
            className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ backgroundColor: `hsl(var(--${category.accent}, var(--primary)))` }}
                >
                  {category.searchTerm}
                </span>
                <h3 className="mt-3 text-2xl font-semibold text-white">{category.name}</h3>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm leading-6 text-muted-foreground">{category.description}</p>
              <Button
                variant="ghost"
                className="px-0 text-primary hover:bg-transparent hover:text-primary/80"
                onClick={() => handleCategoryClick(category.searchTerm)}
              >
                Explore {category.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Categories;
