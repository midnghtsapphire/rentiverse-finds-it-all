
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
// import FeaturedListings from "@/components/FeaturedListings"; // Remove old component
import SupabaseFeaturedListings from "@/components/SupabaseFeaturedListings"; // Add new component
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase()); // Store search term in lowercase for case-insensitive search
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main>
        <Hero onSearch={handleSearch} />
        <Categories />
        {/* Replace FeaturedListings with SupabaseFeaturedListings */}
        <SupabaseFeaturedListings searchTerm={searchTerm} onClearSearch={clearSearch} />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
