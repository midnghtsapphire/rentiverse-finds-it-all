
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import SupabaseFeaturedListings from "@/components/SupabaseFeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import MarketplaceHighlights from "@/components/MarketplaceHighlights";
import TrustSection from "@/components/TrustSection";
import FaqSection from "@/components/FaqSection";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setSearchTerm(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSearch = (term: string) => {
    const normalized = term.toLowerCase();
    setSearchTerm(normalized);
    setSearchParams(normalized ? { q: normalized } : {});
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main>
        <Hero onSearch={handleSearch} />
        <MarketplaceHighlights />
        <Categories onSelectCategory={handleSearch} />
        <SupabaseFeaturedListings searchTerm={searchTerm} onClearSearch={clearSearch} />
        <HowItWorks />
        <TrustSection />
        <FaqSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
