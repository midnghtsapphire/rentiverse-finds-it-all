
import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, LogIn, Menu, Search, ShieldCheck, ShoppingCart, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [location, setLocation] = useState("");
  const { toast } = useToast();
  const { user, isAdmin, signOut } = useAuth();
  const { itemCount } = useCart();

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
    document.getElementById("featured-listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast({
      title: "Searching for rentals",
      description: `Finding rentals near ${location}...`
    });
  };

  const navLinks = [
    { href: "/#categories", label: "Categories" },
    { href: "/#featured-listings", label: "Featured" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#trust", label: "Trust" },
    { href: "/#faq", label: "FAQ" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "Your Rentiverse session has ended.",
      });
    } catch (error) {
      toast({
        title: "Unable to sign out",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Rentiverse
              </span>
            </h1>
          </Link>
          <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">
            finds it all
          </span>
        </div>
        
        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="transition-colors hover:text-slate-950">
                {link.label}
              </Link>
            ))}
          </nav>

          <form className="relative flex items-center w-80" onSubmit={handleSearchSubmit}>
            <Input 
              type="text" 
              className="h-10 rounded-full border-gray-300 pl-4 pr-12 text-sm" 
              placeholder="Search city, category, or use case" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button size="icon" variant="ghost" type="submit" className="absolute right-1 h-8 w-8 rounded-full hover:bg-purple-100" aria-label="Search rentals">
              <Search size={16} />
            </Button>
          </form>
        </div>
        
        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50" asChild>
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          </Button>
          {isAdmin ? (
            <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50" asChild>
              <Link to="/admin">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50" asChild>
              <Link to="/admin/login">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Admin login
              </Link>
            </Button>
          )}
          {user ? (
            <>
              <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                <UserRound className="mr-2 h-4 w-4" />
                {user.email?.split("@")[0] ?? "Account"}
              </Button>
              <Button className="bg-purple-500 text-white hover:bg-purple-600" size="sm" onClick={() => void handleSignOut()}>
                Sign out
              </Button>
            </>
          ) : (
            <Button className="bg-purple-500 text-white hover:bg-purple-600" size="sm" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-purple-100">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link to={link.href} className="text-lg font-medium text-slate-700">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50" asChild>
                    <Link to="/cart">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Cart{itemCount > 0 ? ` (${itemCount})` : ""}
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  {user ? (
                    <Button className="w-full justify-start bg-purple-500 text-white hover:bg-purple-600" onClick={() => void handleSignOut()}>
                      Sign out
                    </Button>
                  ) : (
                    <Button className="w-full justify-start bg-purple-500 text-white hover:bg-purple-600" asChild>
                      <Link to="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </Link>
                    </Button>
                  )}
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50" asChild>
                    <Link to={isAdmin ? "/admin" : "/admin/login"}>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      {isAdmin ? "Admin dashboard" : "Admin login"}
                    </Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 pb-3 pt-3 lg:hidden">
        <form className="relative mx-auto flex max-w-md items-center" onSubmit={handleSearchSubmit}>
          <Input 
            type="text" 
            className="pr-14" 
            placeholder="Search city, category, or use case" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button size="sm" type="submit" className="absolute right-1 bg-purple-500 text-white hover:bg-purple-600" aria-label="Search rentals">
            <Search size={18} />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
