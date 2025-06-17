
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminListings from "@/components/admin/AdminListings";
import AdminCompanies from "@/components/admin/AdminCompanies";
import AdminAffiliateLinks from "@/components/admin/AdminAffiliateLinks";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage your rental platform and affiliate partnerships</p>
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
    </div>
  );
};

export default Admin;
