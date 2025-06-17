
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminCompanyForm from "./AdminCompanyForm";
import { useState } from "react";

interface Company {
  id: string;
  name: string;
  website_url: string;
  logo_url: string | null;
  description: string | null;
  affiliate_base_url: string;
  commission_rate: number;
  created_at: string;
}

const AdminCompanies = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const { data: companies, isLoading, refetch } = useQuery({
    queryKey: ["admin-companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Company[];
    },
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      const { error } = await supabase
        .from("companies")
        .delete()
        .eq("id", id);
      
      if (!error) {
        refetch();
      }
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCompany(null);
    refetch();
  };

  if (showForm) {
    return (
      <AdminCompanyForm 
        company={editingCompany} 
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Companies</CardTitle>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading companies...</p>
        ) : (
          <div className="space-y-4">
            {companies?.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {company.logo_url && (
                    <img src={company.logo_url} alt={company.name} className="w-12 h-12 object-contain" />
                  )}
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.website_url}</p>
                    <p className="text-sm text-green-600">Commission: {company.commission_rate}%</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(company)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(company.id)}>
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

export default AdminCompanies;
