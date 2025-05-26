import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, ArrowRight } from "lucide-react";

const CallToAction = () => {
  const { toast } = useToast();
  
  const handleListYourRental = () => {
    toast({
      title: "List Your Rental",
      description: "The rental listing form will be available soon!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="relative rounded-xl overflow-hidden">
        {/* Background gradient */}
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
              onClick={handleListYourRental}
            >
              <Plus className="mr-2" /> {/* Added Plus icon */}
              List Your Rental
            </Button>
            
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/20 px-8 py-6 h-auto text-lg"
              onClick={() => {
                toast({
                  title: "Learn More",
                  description: "Detailed information will be available soon!",
                });
              }}
            >
              Learn More
              <ArrowRight className="ml-2" /> {/* Added ArrowRight icon */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
