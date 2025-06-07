
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Listing {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  price_per_day: number;
  image_url: string | null;
}

interface SupabaseFeaturedListingsProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const fetchListings = async (searchTerm: string): Promise<Listing[]> => {
  try {
    let query = supabase.from("listings").select("id, title, description, category, location, price_per_day, image_url");

    if (searchTerm) {
      // Basic search: checking title, category, and location.
      // For more advanced search, consider full-text search capabilities of PostgreSQL.
      query = query.or(
        `title.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    query = query.order("created_at", { ascending: false }).limit(8); // Show latest 8 listings

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching listings:", error);
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    console.error("Error in fetchListings:", error);
    return [];
  }
};

const SupabaseFeaturedListings = ({ searchTerm, onClearSearch }: SupabaseFeaturedListingsProps) => {
  const navigate = useNavigate();
  
  const { data: listings, isLoading, error, refetch } = useQuery<Listing[], Error>({
    queryKey: ["listings", searchTerm],
    queryFn: () => fetchListings(searchTerm),
  });

  const handleViewDetails = (listingId: string) => {
    navigate(`/listing/${listingId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-lg text-gray-600">Loading featured rentals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
        <p className="mt-4 text-lg text-red-600">Could not load rentals: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Rentals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover amazing items available for rent from our community.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
            <CardHeader className="p-0">
              <div className="aspect-video bg-gray-100">
                <img
                  src={listing.image_url || "https://via.placeholder.com/400x300.png?text=No+Image"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              {listing.category && (
                <Badge variant="outline" className="mb-2">{listing.category}</Badge>
              )}
              <CardTitle className="text-lg font-semibold mb-1 leading-tight h-14 overflow-hidden">
                {listing.title}
              </CardTitle>
              {listing.location && (
                <p className="text-sm text-gray-500 mb-2">{listing.location}</p>
              )}
            </CardContent>
            <CardFooter className="p-4 border-t flex justify-between items-center">
              <p className="text-lg font-bold text-primary">
                ${listing.price_per_day} <span className="text-sm font-normal text-gray-500">/ day</span>
              </p>
              <Button size="sm" onClick={() => handleViewDetails(listing.id)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupabaseFeaturedListings;
