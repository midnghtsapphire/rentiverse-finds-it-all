
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminListingForm from "./AdminListingForm";
import { useState } from "react";

interface Listing {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  price_per_day: number;
  image_url: string | null;
  created_at: string;
}

const AdminListings = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const { data: listings, isLoading, refetch } = useQuery({
    queryKey: ["admin-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Listing[];
    },
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id);
      
      if (!error) {
        refetch();
      }
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingListing(null);
    refetch();
  };

  if (showForm) {
    return (
      <AdminListingForm 
        listing={editingListing} 
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Listings</CardTitle>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Listing
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading listings...</p>
        ) : (
          <div className="space-y-4">
            {listings?.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {listing.category && <Badge variant="outline">{listing.category}</Badge>}
                    <span className="font-bold text-primary">${listing.price_per_day}/day</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(listing)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(listing.id)}>
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

export default AdminListings;
