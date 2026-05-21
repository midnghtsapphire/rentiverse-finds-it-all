
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Calendar, MapPin, Loader2, ShieldCheck, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fallbackListings, MarketplaceListing, placeholderListingImage } from "@/data/marketplace";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ListingDetailData extends MarketplaceListing {
  createdAt: string;
}

const fetchListing = async (id: string): Promise<ListingDetailData | null> => {
  try {
    const { data, error } = await Promise.race([
      supabase.from("listings").select("*").eq("id", id).single(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timed out loading live listing")), 1800),
      ),
    ]);

    if (!error && data) {
      return {
        id: data.id,
        title: data.title,
        description: data.description ?? "No description available yet.",
        category: data.category ?? "Featured rental",
        location: data.location ?? "Location coming soon",
        pricePerDay: data.price_per_day,
        imageUrl: data.image_url ?? placeholderListingImage(data.title, data.category ?? "Rentiverse"),
        owner: "Rentiverse host",
        availability: "Availability varies by owner",
        delivery: "Contact host for pickup details",
        highlights: [],
        createdAt: data.created_at,
      };
    }
  } catch {
    // fall through to local fallback listing
  }

  const localListing = fallbackListings.find((listing) => listing.id === id);

  return localListing
    ? {
        ...localListing,
        createdAt: new Date().toISOString(),
      }
    : null;
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleSearch = (term: string) => {
    navigate(`/?q=${encodeURIComponent(term.toLowerCase())}`);
  };

  const { data: listing, isLoading, error } = useQuery<ListingDetailData | null, Error>({
    queryKey: ["listing", id],
    queryFn: () => fetchListing(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Loading listing details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
          <p className="mt-4 text-lg text-red-600">
            {error?.message || "Listing not found"}
          </p>
          <Button onClick={() => navigate("/")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      listingId: listing.id,
      title: listing.title,
      category: listing.category,
      imageUrl: listing.imageUrl,
      location: listing.location,
      pricePerDay: listing.pricePerDay,
    });

    toast({
      title: "Added to cart",
      description: `${listing.title} is ready for checkout.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = placeholderListingImage(listing.title, listing.category);
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              {listing.category && (
                <Badge variant="outline" className="mb-2">
                  {listing.category}
                </Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              {listing.location && (
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {listing.location}
                </div>
              )}
              <p className="text-sm font-medium text-muted-foreground">Hosted by {listing.owner}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  ${listing.pricePerDay}
                  <span className="text-lg font-normal text-gray-500"> / day</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button size="lg" className="w-full" onClick={handleAddToCart}>
                    Add to cart
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={() => {
                    handleAddToCart();
                    navigate("/checkout");
                  }}>
                    Book with Stripe
                  </Button>
                  <Button variant="ghost" size="lg" className="w-full" onClick={() => navigate("/")}>
                    Browse More Rentals
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="grid gap-3 border-t pt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  {listing.delivery}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {listing.availability}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {listing.highlights.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>What’s included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    {listing.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle>Listing Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Listed on {new Date(listing.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingDetail;
