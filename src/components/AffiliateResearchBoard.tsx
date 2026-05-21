import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeDollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { affiliateResearchLeads, affiliateRevenueLoop } from "@/data/marketplace";

interface AffiliateResearchBoardProps {
  onSearch: (term: string) => void;
}

const AffiliateResearchBoard = ({ onSearch }: AffiliateResearchBoardProps) => {
  return (
    <section id="affiliate-research" className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Research-backed affiliate expansion
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Public rental leaders now seed an in-app sourcing board
        </h2>
        <p className="mt-4 text-gray-600">
          Ship-to-market now includes a customer-facing research board so Rentiverse can turn category research into
          curated inventory, partner leads, and affiliate monetization paths without waiting for every local host to go
          live first.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {affiliateResearchLeads.map((lead) => (
          <Card key={lead.id} className="flex h-full flex-col lg:col-span-1">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{lead.category}</Badge>
                <Badge variant="secondary">{lead.monetization}</Badge>
              </div>
              <CardTitle className="text-xl">{lead.company}</CardTitle>
              <CardDescription>{lead.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-5">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Product signals to seed in-app</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {lead.productSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {lead.integrationStatus}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <Button variant="outline" onClick={() => onSearch(lead.searchTerm)}>
                  <Search className="mr-2 h-4 w-4" />
                  Search this lane
                </Button>
                <Button asChild variant="ghost">
                  <a href={lead.sourceUrl} target="_blank" rel="noreferrer">
                    View public source
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BadgeDollarSign className="h-6 w-6 text-primary" />
            How affiliate revenue plugs into the existing app
          </CardTitle>
          <CardDescription>
            The cart, Stripe-ready checkout, admin companies table, and affiliate-links table are already in place. The
            missing piece was exposing the research-to-monetization workflow inside the storefront.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <ol className="space-y-3 text-sm text-muted-foreground">
            {affiliateRevenueLoop.map((step, index) => (
              <li key={step} className="flex items-start gap-3 rounded-lg bg-background/80 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-col justify-between gap-4 rounded-lg bg-background/80 p-4 text-sm text-muted-foreground">
            <p>
              Recommended network stack for approval and tracking: Rakuten, CJ Affiliate, Impact, and ShareASale,
              depending on which partner programs approve Rentiverse.
            </p>
            <Button asChild>
              <Link to="/admin/login">Open admin sourcing workflow</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AffiliateResearchBoard;
