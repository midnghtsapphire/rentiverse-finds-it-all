
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroProps {
  onSearch: (term: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [zipCode, setZipCode] = useState("");
  const { toast } = useToast();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim().length === 0) {
      toast({
        title: "Please enter a location",
        description: "Enter a ZIP code or city to continue",
      });
      return;
    }
    onSearch(zipCode);
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
      "Mobile hot tubs for your backyard",
      "Professional karaoke equipment for your party",
      "Goats for lawn maintenance",
      "Designer dresses for your event",
      "UFO detectors for your next camping trip",
      "Mini excavators for your garden project"
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    
    toast({
      title: "🎉 Surprise Found!",
      description: `We found something unexpected: ${randomSurprise}`,
    });
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 z-0"></div>
      
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300/30 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-pink-300/30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Discover the Universe of</span>
            <br />
            <span className="text-white">All Things Rentable</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10">
            From designer dresses to farm goats, mobile saunas to podcast studios,
            <br className="hidden md:block" />
            find everything rentable near you.
          </p>
          
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto mb-8">
            <div className="flex">
              <Input 
                type="text"
                placeholder="Enter ZIP code or city"
                className="rounded-r-none text-lg py-6 bg-white border-white"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Button 
                type="submit"
                size="lg" 
                className="rounded-l-none bg-purple-600 hover:bg-purple-700 text-white px-6 py-6"
              >
                <Search className="mr-2" />
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white hover:text-white px-6 py-6 h-auto text-lg backdrop-blur-sm"
              onClick={handleUseMyLocation}
            >
              <MapPin className="mr-2" />
              Use My Location
            </Button>
            
            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-6 h-auto text-lg"
              onClick={handleSurpriseMe}
            >
              <Sparkles className="mr-2" />
              Surprise Me!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
