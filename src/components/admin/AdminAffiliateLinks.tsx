
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

interface AffiliateLink {
  id: string;
  listing_id: string;
  company_id: string;
  affiliate_url: string;
  product_name: string;
  product_price: number | null;
  commission_amount: number | null;
  is_active: boolean;
  created_at: string;
  listings: {
    title: string;
  };
  companies: {
    name: string;
  };
}

const AdminAffiliateLinks = () => {
  const { data: affiliateLinks, isLoading } = useQuery({
    queryKey: ["admin-affiliate-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("affiliate_links")
        .select(`
          *,
          listings(title),
          companies(name)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as AffiliateLink[];
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Affiliate Links</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading affiliate links...</p>
        ) : (
          <div className="space-y-4">
            {affiliateLinks?.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{link.product_name}</h3>
                  <p className="text-sm text-gray-600">
                    {link.listings.title} • {link.companies.name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={link.is_active ? "default" : "secondary"}>
                      {link.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {link.product_price && (
                      <span className="text-sm text-gray-500">${link.product_price}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAffiliateLinks;
