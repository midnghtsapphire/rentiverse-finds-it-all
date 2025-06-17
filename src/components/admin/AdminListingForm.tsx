
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  price_per_day: number;
  image_url: string | null;
}

interface AdminListingFormProps {
  listing?: Listing | null;
  onClose: () => void;
}

const AdminListingForm = ({ listing, onClose }: AdminListingFormProps) => {
  const [formData, setFormData] = useState({
    title: listing?.title || "",
    description: listing?.description || "",
    category: listing?.category || "",
    location: listing?.location || "",
    price_per_day: listing?.price_per_day || 0,
    image_url: listing?.image_url || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (listing) {
        const { error } = await supabase
          .from("listings")
          .update(formData)
          .eq("id", listing.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("listings")
          .insert([formData]);
        
        if (error) throw error;
      }
      
      onClose();
    } catch (error) {
      console.error("Error saving listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle>{listing ? "Edit Listing" : "Add New Listing"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price_per_day">Price per Day ($)</Label>
              <Input
                id="price_per_day"
                type="number"
                step="0.01"
                value={formData.price_per_day}
                onChange={(e) => setFormData({ ...formData, price_per_day: parseFloat(e.target.value) })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : listing ? "Update Listing" : "Create Listing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminListingForm;
