
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define category images
const categoryImages = {
  fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200&auto=format",
  pets: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&auto=format",
  furniture: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?q=80&w=200&auto=format",
  equipment: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=200&auto=format",
  events: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format",
  media: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=200&auto=format",
  lifestyle: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=200&auto=format",
  unique: "https://images.unsplash.com/photo-1554941068-a252680d25d3?q=80&w=200&auto=format",
  tools: "https://images.unsplash.com/photo-1609899252456-6db1eb0aecc5?q=80&w=200&auto=format",
  automotive: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=200&auto=format",
  sports: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&auto=format",
  kitchen: "https://images.unsplash.com/photo-1556909114-c71d2e2c4d37?q=80&w=200&auto=format"
};

const categoryGroups = [
  {
    name: "Fashion & Beauty",
    color: "fashion",
    items: [
      { name: "Dresses", image: categoryImages.fashion },
      { name: "Purses", image: categoryImages.fashion },
      { name: "Glasses", image: categoryImages.fashion },
      { name: "Jewelry", image: categoryImages.fashion },
    ]
  },
  {
    name: "Tools & Hardware",
    color: "tools",
    items: [
      { name: "Air Compressors", image: categoryImages.tools },
      { name: "Nail Guns", image: categoryImages.tools },
      { name: "Power Drills", image: categoryImages.tools },
      { name: "Pressure Washers", image: categoryImages.tools },
    ]
  },
  {
    name: "Pets & Animals",
    color: "pets",
    items: [
      { name: "Goats", image: categoryImages.pets },
      { name: "Mini Pigs", image: categoryImages.pets },
      { name: "Therapy Dogs", image: categoryImages.pets },
      { name: "Parrots", image: categoryImages.pets },
    ]
  },
  {
    name: "Furniture & Decor",
    color: "furniture",
    items: [
      { name: "Couches", image: categoryImages.furniture },
      { name: "Art", image: categoryImages.furniture },
      { name: "Plants", image: categoryImages.furniture },
      { name: "Chandeliers", image: categoryImages.furniture },
    ]
  },
  {
    name: "Heavy Equipment",
    color: "equipment",
    items: [
      { name: "Excavators", image: categoryImages.equipment },
      { name: "Trailers", image: categoryImages.equipment },
      { name: "Augers", image: categoryImages.equipment },
      { name: "Concrete Mixers", image: categoryImages.equipment },
    ]
  },
  {
    name: "Sports & Recreation",
    color: "sports",
    items: [
      { name: "Kayaks", image: categoryImages.sports },
      { name: "Bikes", image: categoryImages.sports },
      { name: "Ski Equipment", image: categoryImages.sports },
      { name: "Camping Gear", image: categoryImages.sports },
    ]
  },
  {
    name: "Automotive",
    color: "automotive",
    items: [
      { name: "Car Jacks", image: categoryImages.automotive },
      { name: "Diagnostic Tools", image: categoryImages.automotive },
      { name: "Car Wash Equipment", image: categoryImages.automotive },
      { name: "Tire Changers", image: categoryImages.automotive },
    ]
  },
  {
    name: "Kitchen Equipment",
    color: "kitchen",
    items: [
      { name: "Stand Mixers", image: categoryImages.kitchen },
      { name: "Food Processors", image: categoryImages.kitchen },
      { name: "Espresso Machines", image: categoryImages.kitchen },
      { name: "Catering Equipment", image: categoryImages.kitchen },
    ]
  },
  {
    name: "Events & Entertainment",
    color: "events",
    items: [
      { name: "Bounce Houses", image: categoryImages.events },
      { name: "Photo Booths", image: categoryImages.events },
      { name: "Karaoke Machines", image: categoryImages.events },
      { name: "Party Equipment", image: categoryImages.events },
    ]
  },
  {
    name: "Media Gear",
    color: "media",
    items: [
      { name: "DSLRs", image: categoryImages.media },
      { name: "Ring Lights", image: categoryImages.media },
      { name: "Podcast Kits", image: categoryImages.media },
      { name: "Green Screens", image: categoryImages.media },
    ]
  },
  {
    name: "Lifestyle",
    color: "lifestyle",
    items: [
      { name: "Surfboards", image: categoryImages.lifestyle },
      { name: "Hot Tubs", image: categoryImages.lifestyle },
      { name: "Tiny Cabins", image: categoryImages.lifestyle },
      { name: "Glamping Gear", image: categoryImages.lifestyle },
    ]
  },
  {
    name: "Unique Experiences",
    color: "unique",
    items: [
      { name: "Beekeeper for a Day", image: categoryImages.unique },
      { name: "UFO Detectors", image: categoryImages.unique },
      { name: "Psychic Reading", image: categoryImages.unique },
      { name: "Unusual Rentals", image: categoryImages.unique },
    ]
  },
];

const Categories = () => {
  const { toast } = useToast();
  
  const handleCategoryClick = (category: string) => {
    toast({
      title: "Category Selected",
      description: `You clicked on the ${category} category. Showing related rentals.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Browse by Category</h2>
      <p className="text-gray-600 text-center mb-12">Discover thousands of unique items available for rent</p>
      
      <div className="space-y-12">
        {categoryGroups.map((group) => (
          <div key={group.name} className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <span 
                className={`w-4 h-4 mr-2 rounded-full bg-${group.color}`} 
                style={{ backgroundColor: `var(--${group.color}, #9b87f5)` }} 
              />
              {group.name}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {group.items.map((item) => (
                <a 
                  onClick={() => handleCategoryClick(item.name)}
                  key={item.name} 
                  className="relative category-card aspect-square"
                  style={{ 
                    backgroundColor: `var(--${group.color}, #9b87f5)10`,
                    borderColor: `var(--${group.color}, #9b87f5)30`
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  <div className="mt-auto backdrop-blur-sm bg-white/80 absolute bottom-0 left-0 right-0 px-6 py-3 border-t border-gray-200 z-10">
                    <h4 className="font-semibold">{item.name}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
