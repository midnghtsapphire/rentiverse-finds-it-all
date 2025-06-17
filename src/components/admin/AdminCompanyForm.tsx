
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface Company {
  id: string;
  name: string;
  website_url: string;
  logo_url: string | null;
  description: string | null;
  affiliate_base_url: string;
  commission_rate: number;
}

interface AdminCompanyFormProps {
  company?: Company | null;
  onClose: () => void;
}

const AdminCompanyForm = ({ company, onClose }: AdminCompanyFormProps) => {
  const [formData, setFormData] = useState({
    name: company?.name || "",
    website_url: company?.website_url || "",
    logo_url: company?.logo_url || "",
    description: company?.description || "",
    affiliate_base_url: company?.affiliate_base_url || "",
    commission_rate: company?.commission_rate || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (company) {
        const { error } = await supabase
          .from("companies")
          .update(formData)
          .eq("id", company.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("companies")
          .insert([formData]);
        
        if (error) throw error;
      }
      
      onClose();
    } catch (error) {
      console.error("Error saving company:", error);
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
        <CardTitle>{company ? "Edit Company" : "Add New Company"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="website_url">Website URL</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              type="url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
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
              <Label htmlFor="affiliate_base_url">Affiliate Base URL</Label>
              <Input
                id="affiliate_base_url"
                type="url"
                value={formData.affiliate_base_url}
                onChange={(e) => setFormData({ ...formData, affiliate_base_url: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="commission_rate">Commission Rate (%)</Label>
              <Input
                id="commission_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.commission_rate}
                onChange={(e) => setFormData({ ...formData, commission_rate: parseFloat(e.target.value) })}
                required
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : company ? "Update Company" : "Create Company"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminCompanyForm;
