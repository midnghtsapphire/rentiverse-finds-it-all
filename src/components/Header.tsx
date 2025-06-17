import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const { toast } = useToast();

  useEffect(() => {
    // Debug CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    console.log("CSS Variables Debug:");
    console.log("--primary:", rootStyles.getPropertyValue('--primary'));
    console.log("--background:", rootStyles.getPropertyValue('--background'));
    console.log("--foreground:", rootStyles.getPropertyValue('--foreground'));
    console.log("--fashion:", rootStyles.getPropertyValue('--fashion'));
    
    // Check if Tailwind classes are working
    const testElement = document.createElement('div');
    testElement.className = 'bg-red-500 text-white';
    document.body.appendChild(testElement);
    const testStyles = getComputedStyle(testElement);
    console.log("Tailwind test - background:", testStyles.backgroundColor);
    console.log("Tailwind test - color:", testStyles.color);
    document.body.removeChild(testElement);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (location.trim().length === 0) {
      toast({
        title: "Please enter a location",
        description: "Enter a ZIP code or city to continue",
      });
      return;
    }
    onSearch(location);
    toast({
      title: "Searching for rentals",
      description: `Finding rentals near ${location}...`
    });
  };

  const handleUseMyLocation = () => {
    toast({
      title: "Using your location",
      description: "Finding rentals near your current location..."
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location detected",
            description: `Latitude: ${position.coords.latitude.toFixed(2)}, Longitude: ${position.coords.longitude.toFixed(2)}`,
          });
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Rentiverse</span>
            </h1>
          </Link>
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            beta
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 rounded-md text-sm"
              >
                Search
              </TabsTrigger>
              <TabsTrigger 
                value="browse" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 rounded-md text-sm"
              >
                Browse
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form className="relative flex items-center w-80" onSubmit={handleSearchSubmit}>
            <div className="absolute left-3 text-gray-400">
              <MapPin size={16} />
            </div>
            <Input 
              type="text" 
              className="pl-9 pr-4 py-2 text-sm h-9" 
              placeholder="Enter ZIP code or city" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button size="icon" variant="ghost" type="submit" className="absolute right-1 h-7 w-7" aria-label="Search rentals">
              <Search size={16} />
            </Button>
          </form>
          <Button variant="ghost" size="sm" onClick={handleUseMyLocation}>
            <MapPin size={16} className="mr-1.5" />
            Use My Location
          </Button>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" size="sm"
            onClick={() => {
              toast({
                title: "Sign In",
                description: "Sign in functionality would open here"
              });
            }}
          >
            Sign In
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="sm"
            onClick={() => {
              toast({
                title: "List Your Rental",
                description: "The rental listing form would open here"
              });
            }}
          >
            List Your Rental
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full justify-start"
                    onClick={() => {
                      toast({
                        title: "Sign In",
                        description: "Sign in functionality would open here"
                      });
                    }}
                  >
                    Sign In
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full justify-start" 
                    onClick={() => {
                      toast({
                        title: "List Your Rental",
                        description: "The rental listing form would open here"
                      });
                    }}
                  >
                    List Your Rental
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3 border-t border-gray-200 md:border-t-0">
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full mb-2 pt-3">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg flex justify-evenly">
            <TabsTrigger 
              value="search" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
            >
              Search
            </TabsTrigger>
            <TabsTrigger 
              value="browse" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md"
            >
              Browse
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {activeTab === 'search' && (
          <>
            <form className="relative flex items-center mb-2" onSubmit={handleSearchSubmit}>
              <div className="absolute left-3 text-gray-400">
                <MapPin size={18} />
              </div>
              <Input 
                type="text" 
                className="pl-10 pr-4 py-2" 
                placeholder="Enter ZIP code or city" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button size="sm" type="submit" className="absolute right-1 bg-blue-500 hover:bg-blue-600 text-white" aria-label="Search rentals">
                <Search size={18} />
              </Button>
            </form>
            <Button 
              variant="link" 
              className="text-sm w-full justify-center text-blue-500"
              onClick={handleUseMyLocation}
            >
              <MapPin className="mr-2" />
              Use My Location
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
