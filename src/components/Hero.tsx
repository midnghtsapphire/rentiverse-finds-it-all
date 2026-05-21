
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Search, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { marketplaceStats } from "@/data/marketplace";

interface HeroProps {
  onSearch: (term: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [zipCode, setZipCode] = useState("");
  const { toast } = useToast();

  const submitSearch = (value: string) => {
    onSearch(value);
    document.getElementById("featured-listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim().length === 0) {
      toast({
        title: "Please enter a location",
        description: "Enter a ZIP code or city to continue",
      });
      return;
    }
    submitSearch(zipCode);
    toast({
      title: "Searching for rentals",
      description: `Finding everything rentable near ${zipCode}`,
    });
  };

  const handleUseMyLocation = () => {
    toast({
      title: "Using your location",
      description: "Finding rentals near your current location...",
    });
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location detected",
            description: `Latitude: ${position.coords.latitude.toFixed(2)}, Longitude: ${position.coords.longitude.toFixed(2)}`,
          });
          // For actual search: onSearch(`lat:${position.coords.latitude},lon:${position.coords.longitude}`);
          // This would require backend/API to convert coords to location or listings to have coords.
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location services or enter your ZIP code manually",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter your ZIP code manually",
        variant: "destructive"
      });
    }
  };

  const handleSurpriseMe = () => {
    const surprises = [
      "photo booth",
      "camping",
      "tile saw",
      "formalwear",
      "podcast kit",
      "garden party"
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    setZipCode(randomSurprise);
    submitSearch(randomSurprise);
    
    toast({
      title: "🎉 Surprise Found!",
      description: `Showing curated results for ${randomSurprise}`,
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.35),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.25),_transparent_30%),linear-gradient(135deg,_#020617,_#1e1b4b_40%,_#111827)]" />
      
      <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
            <Sparkles className="mr-2 h-4 w-4 text-pink-300" />
            Rentiverse finds it all — built for local access over ownership
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Discover the place to rent
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-sky-200 bg-clip-text text-transparent">
              {" "}almost anything nearby
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-3xl text-lg text-white/80 md:text-xl">
            Rentiverse is the launch-ready storefront for tools, party gear, creator kits, outdoor equipment, and occasion-based rentals. It now ships with curated inventory so the website still works before the live marketplace is fully populated.
          </p>
          
          <form onSubmit={handleSearchSubmit} className="mx-auto mb-8 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur md:flex-row">
              <Input 
                type="text"
                placeholder="Search by city, use case, or category"
                className="h-14 rounded-2xl border-white/15 bg-white/95 text-base text-slate-900 placeholder:text-slate-500 md:text-lg"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Button 
                type="submit"
                size="lg" 
                className="h-14 rounded-2xl bg-white text-slate-950 hover:bg-white/90"
              >
                <Search className="mr-2 h-4 w-4" />
                Find rentals
              </Button>
            </div>
          </form>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {["tools", "events", "camping", "creator", "formalwear"].map((term) => (
              <Button
                key={term}
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setZipCode(term);
                  submitSearch(term);
                }}
              >
                {term}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              variant="outline" 
              className="h-auto border-2 border-white/40 bg-white/10 px-6 py-6 text-lg text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              onClick={handleUseMyLocation}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Use My Location
            </Button>
            
            <Button 
              className="h-auto bg-pink-500 px-6 py-6 text-lg text-white hover:bg-pink-600"
              onClick={handleSurpriseMe}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Surprise Me!
            </Button>

            <Button
              variant="ghost"
              className="h-auto px-6 py-6 text-lg text-white hover:bg-white/10 hover:text-white"
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              How it works
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-14 grid gap-4 text-left md:grid-cols-3">
            {marketplaceStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
