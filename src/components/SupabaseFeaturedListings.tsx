
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  fallbackListings,
  matchesListing,
  MarketplaceListing,
  placeholderListingImage,
  sanitizeSearchTerm,
} from "@/data/marketplace";

interface ListingsResponse {
  listings: MarketplaceListing[];
  source: "supabase" | "fallback";
}

interface SupabaseFeaturedListingsProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const fetchListings = async (searchTerm: string): Promise<ListingsResponse> => {
  const normalizedSearch = sanitizeSearchTerm(searchTerm);
  const timeoutMs = 1800;

  try {
    let query = supabase.from("listings").select("id, title, description, category, location, price_per_day, image_url");

    if (normalizedSearch) {
      query = query.or(
        `title.ilike.%${normalizedSearch}%,category.ilike.%${normalizedSearch}%,location.ilike.%${normalizedSearch}%,description.ilike.%${normalizedSearch}%`
      );
    }

    query = query.order("created_at", { ascending: false }).limit(8);

    const { data, error } = await Promise.race([
      query,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timed out loading live listings")), timeoutMs),
      ),
    ]);

    if (error) {
      throw error;
    }

    const listings = (data ?? []).map((listing) => ({
      id: listing.id,
      title: listing.title,
      description: listing.description ?? "No description available yet.",
      category: listing.category ?? "Featured rental",
      location: listing.location ?? "Location coming soon",
      pricePerDay: listing.price_per_day,
      imageUrl: listing.image_url ?? placeholderListingImage(listing.title, listing.category ?? "Rentiverse"),
      owner: "Rentiverse host",
      availability: "Availability varies by owner",
      delivery: "Contact host for pickup details",
      highlights: [],
    }));

    if (listings.length > 0) {
      return { listings, source: "supabase" };
    }
  } catch {
    // fall back to curated launch content below
  }

  return {
    listings: fallbackListings.filter((listing) => matchesListing(listing, normalizedSearch)).slice(0, 6),
    source: "fallback",
  };
};

const SupabaseFeaturedListings = ({ searchTerm, onClearSearch }: SupabaseFeaturedListingsProps) => {
  const navigate = useNavigate();
  
  const { data, isLoading } = useQuery<ListingsResponse, Error>({
    queryKey: ["listings", searchTerm],
    queryFn: () => fetchListings(searchTerm),
  });

  const listings = data?.listings ?? [];
  const usingFallback = data?.source === "fallback";

  const handleViewDetails = (listingId: string) => {
    navigate(`/listing/${listingId}`);
  };

  if (isLoading) {
    return (
      <section id="featured-listings" className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-lg text-gray-600">Loading featured rentals...</p>
      </section>
    );
  }

  if (listings.length === 0) {
    return (
      <section id="featured-listings" className="container mx-auto px-4 py-16 text-center">
        <Inbox className="h-16 w-16 text-gray-400 mx-auto" />
        <h3 className="mt-6 text-2xl font-semibold">No Rentals Found</h3>
        {searchTerm ? (
          <>
            <p className="mt-2 text-gray-600">
              We couldn't find any rentals matching "{searchTerm}". Try a different search or clear your search.
            </p>
            <Button variant="outline" onClick={onClearSearch} className="mt-4">
              Clear Search
            </Button>
          </>
        ) : (
          <p className="mt-2 text-gray-600">Check back later or try searching for something specific!</p>
        )}
      </section>
    );
  }

  return (
    <section id="featured-listings" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Featured listings
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">A launch-ready catalog that keeps the site useful</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse live listings when available, or curated launch inventory when the marketplace is still warming up.
        </p>
        {usingFallback ? (
          <Badge variant="secondary" className="mt-4">
            Showing curated launch collection
          </Badge>
        ) : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
            <CardHeader className="p-0">
              <div className="aspect-video bg-gray-100">
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = placeholderListingImage(listing.title, listing.category);
                  }}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <Badge variant="outline" className="mb-2">{listing.category}</Badge>
              <CardTitle className="text-lg font-semibold mb-1 leading-tight h-14 overflow-hidden">
                {listing.title}
              </CardTitle>
              <p className="text-sm text-gray-500 mb-2">{listing.location}</p>
              <p className="line-clamp-3 text-sm text-muted-foreground">{listing.description}</p>
            </CardContent>
            <CardFooter className="p-4 border-t flex justify-between items-center">
              <p className="text-lg font-bold text-primary">
                ${listing.pricePerDay} <span className="text-sm font-normal text-gray-500">/ day</span>
              </p>
              <Button size="sm" onClick={() => handleViewDetails(listing.id)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SupabaseFeaturedListings;
