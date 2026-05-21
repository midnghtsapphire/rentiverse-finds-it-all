
import { Calendar, CreditCard, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Search & Discover",
    description: "Browse thousands of rentable items across multiple categories."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Review pickup & trust details",
    description: "Every listing highlights what is included, how handoff works, and what renters should expect."
  },
  {
    icon: <Calendar className="w-10 h-10 text-primary" />,
    title: "Book & Schedule",
    description: "Choose your rental dates and make a reservation."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-primary" />,
    title: "Pay & Enjoy",
    description: "Secure payment and enjoy your rental for as long as you need."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          How it works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">A simple marketplace flow for renters and owners</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The product story is now clear even before payments and back-office automation are fully wired up.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="relative flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 bg-primary/10 p-4 rounded-full">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-0.5 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
