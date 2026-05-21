export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  pricePerDay: number;
  imageUrl: string;
  owner: string;
  availability: string;
  delivery: string;
  highlights: string[];
}

export interface MarketplaceCategory {
  name: string;
  description: string;
  searchTerm: string;
  accent: string;
  image: string;
}

const createArtwork = ({
  eyebrow,
  headline,
  primary,
  secondary,
}: {
  eyebrow: string;
  headline: string;
  primary: string;
  secondary: string;
}) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${headline}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" rx="48" />
      <circle cx="940" cy="180" r="220" fill="rgba(255,255,255,0.14)" />
      <circle cx="220" cy="760" r="260" fill="rgba(15,23,42,0.16)" />
      <text x="90" y="150" fill="rgba(255,255,255,0.72)" font-size="40" font-family="Arial, sans-serif" letter-spacing="6">${eyebrow.toUpperCase()}</text>
      <text x="90" y="360" fill="#ffffff" font-size="96" font-weight="700" font-family="Arial, sans-serif">${headline}</text>
      <text x="90" y="445" fill="rgba(255,255,255,0.88)" font-size="34" font-family="Arial, sans-serif">Rentiverse finds it all</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const placeholderListingImage = (headline: string, eyebrow = "Rentiverse") =>
  createArtwork({
    eyebrow,
    headline,
    primary: "#7c3aed",
    secondary: "#ec4899",
  });

export const marketplaceStats = [
  { value: "12", label: "launch categories" },
  { value: "48h", label: "average response goal" },
  { value: "100%", label: "focus on local discovery" },
];

export const marketplaceCategories: MarketplaceCategory[] = [
  {
    name: "Tools & DIY",
    description: "Pressure washers, tile saws, ladders, and weekend project gear.",
    searchTerm: "tools",
    accent: "tools",
    image: createArtwork({
      eyebrow: "Tools & DIY",
      headline: "Weekend project gear",
      primary: "#f97316",
      secondary: "#7c3aed",
    }),
  },
  {
    name: "Events & Parties",
    description: "Photo booths, speakers, seating, and crowd-pleasing extras.",
    searchTerm: "events",
    accent: "events",
    image: createArtwork({
      eyebrow: "Events",
      headline: "Celebrate without buying",
      primary: "#db2777",
      secondary: "#7c3aed",
    }),
  },
  {
    name: "Outdoor Adventure",
    description: "Kayaks, camping kits, e-bikes, and seasonal escape essentials.",
    searchTerm: "outdoor",
    accent: "sports",
    image: createArtwork({
      eyebrow: "Outdoor",
      headline: "Adventure kits",
      primary: "#0f766e",
      secondary: "#2563eb",
    }),
  },
  {
    name: "Photo & Creator Gear",
    description: "Cameras, podcast kits, lights, and creator-ready bundles.",
    searchTerm: "creator",
    accent: "media",
    image: createArtwork({
      eyebrow: "Creator",
      headline: "Record on demand",
      primary: "#2563eb",
      secondary: "#7c3aed",
    }),
  },
  {
    name: "Style & Special Occasion",
    description: "Formalwear, statement accessories, and event-ready looks.",
    searchTerm: "style",
    accent: "fashion",
    image: createArtwork({
      eyebrow: "Style",
      headline: "Look exceptional once",
      primary: "#ec4899",
      secondary: "#8b5cf6",
    }),
  },
  {
    name: "Home Hosting",
    description: "Tablescapes, serving pieces, décor, and guest-ready upgrades.",
    searchTerm: "home",
    accent: "furniture",
    image: createArtwork({
      eyebrow: "Hosting",
      headline: "Set the table beautifully",
      primary: "#8b5e34",
      secondary: "#f97316",
    }),
  },
];

export const fallbackListings: MarketplaceListing[] = [
  {
    id: "portable-photo-booth",
    title: "Portable Photo Booth Studio",
    description:
      "Complete event booth with DSLR camera, ring light, prop kit, and instant sharing station for weddings, birthdays, and brand activations.",
    category: "Events & Parties",
    location: "Nashville, TN",
    pricePerDay: 145,
    imageUrl: createArtwork({
      eyebrow: "Events & Parties",
      headline: "Photo booth studio",
      primary: "#8b5cf6",
      secondary: "#ec4899",
    }),
    owner: "Bright Side Events",
    availability: "Available most weekends",
    delivery: "Pickup or local delivery within 20 miles",
    highlights: ["Instant digital gallery", "Backdrop included", "Attendant add-on available"],
  },
  {
    id: "podcast-starter-kit",
    title: "Podcast Starter Kit",
    description:
      "Two-mic creator kit with mixer, headphones, acoustic panels, and a compact lighting setup for home or guest interviews.",
    category: "Photo & Creator Gear",
    location: "Austin, TX",
    pricePerDay: 68,
    imageUrl: createArtwork({
      eyebrow: "Creator Gear",
      headline: "Podcast starter kit",
      primary: "#2563eb",
      secondary: "#7c3aed",
    }),
    owner: "Signal Room Co.",
    availability: "Weekday pickup available",
    delivery: "Pickup only",
    highlights: ["Rode microphones", "Simple setup guide", "Remote recording compatible"],
  },
  {
    id: "weekend-camping-pack",
    title: "Weekend Camping Pack for Four",
    description:
      "Tents, lanterns, camp chairs, cook set, sleeping pads, and extras bundled for easy group getaways without buying once-a-year gear.",
    category: "Outdoor Adventure",
    location: "Bend, OR",
    pricePerDay: 92,
    imageUrl: createArtwork({
      eyebrow: "Outdoor Adventure",
      headline: "Camping pack for four",
      primary: "#0f766e",
      secondary: "#0ea5e9",
    }),
    owner: "High Desert Supply",
    availability: "Book 3 days in advance",
    delivery: "Pickup with optional trailhead drop-off",
    highlights: ["Seats four", "Cooler included", "Rainfly + repair kit"],
  },
  {
    id: "tile-saw-pro-kit",
    title: "Tile Saw + DIY Bathroom Refresh Kit",
    description:
      "Professional wet tile saw with laser level, spacers, mixing paddle, and finishing tools for serious weekend renovation work.",
    category: "Tools & DIY",
    location: "Charlotte, NC",
    pricePerDay: 85,
    imageUrl: createArtwork({
      eyebrow: "Tools & DIY",
      headline: "Tile saw pro kit",
      primary: "#f97316",
      secondary: "#7c3aed",
    }),
    owner: "Neighbor Tool Library",
    availability: "Same-day pickup often available",
    delivery: "Pickup only",
    highlights: ["Porcelain-ready blade", "Safety gear included", "Weekend bundle pricing"],
  },
  {
    id: "garden-party-tabletop",
    title: "Garden Party Tabletop Collection",
    description:
      "Curated hosting set with neutral linens, candle holders, platters, glassware, and layered décor for bridal showers or dinners.",
    category: "Home Hosting",
    location: "Charleston, SC",
    pricePerDay: 120,
    imageUrl: createArtwork({
      eyebrow: "Home Hosting",
      headline: "Garden party tabletop",
      primary: "#9333ea",
      secondary: "#f97316",
    }),
    owner: "Harbor House Styling",
    availability: "Reserve by event date",
    delivery: "White-glove delivery available",
    highlights: ["Seats 12 guests", "Color palette options", "Setup add-on available"],
  },
  {
    id: "designer-evening-edit",
    title: "Designer Evening Edit",
    description:
      "Formalwear bundle with gown options, clutch, statement earrings, and garment care support for galas, weddings, and photo shoots.",
    category: "Style & Special Occasion",
    location: "New York, NY",
    pricePerDay: 175,
    imageUrl: createArtwork({
      eyebrow: "Style",
      headline: "Designer evening edit",
      primary: "#ec4899",
      secondary: "#8b5cf6",
    }),
    owner: "Borrowed by Belle",
    availability: "Appointments weekly",
    delivery: "Courier delivery in Manhattan",
    highlights: ["Size consultations", "Backup style included", "Cleaning handled after return"],
  },
];

export const faqItems = [
  {
    question: "What makes Rentiverse different from a basic classifieds site?",
    answer:
      "Rentiverse is designed around temporary access instead of permanent ownership. Listings emphasize availability, pricing by day, pickup or delivery, and trust signals so renters can move from discovery to booking faster.",
  },
  {
    question: "Does the site still work if the live Supabase catalog is empty?",
    answer:
      "Yes. The storefront now falls back to a curated launch catalog so the experience remains useful during setup, demos, and early go-to-market work.",
  },
  {
    question: "What categories should launch first?",
    answer:
      "Start with high-intent, repeat-use categories where ownership is expensive or inconvenient: tools, party equipment, outdoor gear, creator kits, and occasion-based fashion.",
  },
  {
    question: "How should owners be onboarded?",
    answer:
      "Lead with simple listing templates, strong photography guidance, pickup rules, and response-time expectations. Owners need confidence and clarity before marketplace liquidity follows.",
  },
];

export const trustPrinciples = [
  {
    title: "Clear expectations",
    description:
      "Every listing should explain pickup, delivery, condition, and what is included so renters can book confidently.",
  },
  {
    title: "Launch with local density",
    description:
      "The experience is optimized for city-by-city discovery instead of pretending to cover everywhere equally on day one.",
  },
  {
    title: "Curated quality",
    description:
      "Rentiverse can mix marketplace inventory with editorially curated launch collections so the site never feels empty.",
  },
];

export const sanitizeSearchTerm = (value: string) =>
  value.trim().replace(/[(),]/g, " ").replace(/\s+/g, " ").toLowerCase();

export const matchesListing = (listing: MarketplaceListing, query: string) => {
  if (!query) {
    return true;
  }

  const haystack = [
    listing.title,
    listing.description,
    listing.category,
    listing.location,
    listing.owner,
    ...listing.highlights,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
};
