
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminListings from "@/components/admin/AdminListings";
import AdminCompanies from "@/components/admin/AdminCompanies";
import AdminAffiliateLinks from "@/components/admin/AdminAffiliateLinks";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Admin = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={(term) => navigate(`/?q=${encodeURIComponent(term.toLowerCase())}`)} />
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
          <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{user?.email}</span>
              <Button variant="outline" onClick={() => void signOut().then(() => navigate("/"))}>
                Sign out
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Manage your rental platform, affiliate partnerships, and the standard admin surface expected in each ship-to-market website app.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="listings" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="affiliate-links">Affiliate Links</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <AdminListings />
          </TabsContent>

          <TabsContent value="companies">
            <AdminCompanies />
          </TabsContent>

          <TabsContent value="affiliate-links">
            <AdminAffiliateLinks />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
