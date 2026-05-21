import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="list-your-rental" className="container mx-auto px-4 py-16 md:py-24">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fashion to-unique opacity-90"></div>
        
        <div className="relative z-10 px-6 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Have Something to Rent?</h2>
            <p className="text-white/90 text-lg max-w-md">
              From sports equipment to luxury items, start making money by renting out your things.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-white text-fashion hover:bg-white/90 hover:text-fashion px-8 py-6 h-auto text-lg"
              asChild
            >
              <Link to="/login">
                <Plus className="mr-2" />
                List Your Rental
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/20 px-8 py-6 h-auto text-lg"
              asChild
            >
              <Link to="/admin/login">
                Admin Panel
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
