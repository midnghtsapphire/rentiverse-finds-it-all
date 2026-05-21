
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: <Facebook size={20} /> },
    { name: "Instagram", href: "#", icon: <Instagram size={20} /> },
    { name: "Twitter", href: "#", icon: <Twitter size={20} /> },
  ];

  const footerSections = [
    {
      title: "Categories",
      ariaLabel: "Browse rental categories",
      links: [
        { name: "Tools & DIY", href: "#categories" },
        { name: "Events & Parties", href: "#categories" },
        { name: "Outdoor Adventure", href: "#categories" },
        { name: "Creator Gear", href: "#categories" },
        { name: "Style & Occasion", href: "#categories" },
      ],
    },
    {
      title: "About",
      ariaLabel: "Learn more about Rentiverse",
      links: [
        { name: "How It Works", href: "#how-it-works" },
        { name: "List Your Rental", href: "#list-your-rental" },
        { name: "Trust & Safety", href: "#trust" },
        { name: "FAQ", href: "#faq" },
        { name: "Featured Listings", href: "#featured-listings" },
      ],
    },
    {
      title: "Support",
      ariaLabel: "Get help and support",
      links: [
        { name: "Contact Us", href: "mailto:hello@rentiverse.com" },
        { name: "Help Center", href: "#faq" },
        { name: "Security Approach", href: "#trust" },
        { name: "Launch FAQ", href: "#faq" },
        { name: "Owner Onboarding", href: "#list-your-rental" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Rentiverse Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rentiverse</h3>
            <p className="text-gray-400 mb-4 text-sm">
              The universe of all things rentable. Find nearby gear, occasion-based essentials, and launch-ready local inventory without forcing ownership.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Visit Rentiverse on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.ariaLabel}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
            </nav>
          ))}
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Rentiverse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
