
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MousePointer, DollarSign, Target } from "lucide-react";

interface AnalyticsData {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
}

const AdminAnalytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async (): Promise<AnalyticsData> => {
      // Get total clicks
      const { count: totalClicks } = await supabase
        .from("affiliate_clicks")
        .select("*", { count: "exact", head: true });

      // Get total conversions
      const { count: totalConversions } = await supabase
        .from("affiliate_conversions")
        .select("*", { count: "exact", head: true });

      // Get total revenue
      const { data: revenueData } = await supabase
        .from("affiliate_conversions")
        .select("commission_earned");

      const totalRevenue = revenueData?.reduce((sum, conversion) => 
        sum + (conversion.commission_earned || 0), 0) || 0;

      const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

      return {
        totalClicks: totalClicks || 0,
        totalConversions: totalConversions || 0,
        totalRevenue,
        conversionRate,
      };
    },
  });

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    format = "number" 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    format?: "number" | "currency" | "percentage";
  }) => {
    const formatValue = () => {
      switch (format) {
        case "currency":
          return `$${value.toFixed(2)}`;
        case "percentage":
          return `${value.toFixed(1)}%`;
        default:
          return value.toLocaleString();
      }
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatValue()}</div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <p>Loading analytics...</p>
        ) : (
          <>
            <StatCard
              title="Total Clicks"
              value={analytics?.totalClicks || 0}
              icon={MousePointer}
            />
            <StatCard
              title="Conversions"
              value={analytics?.totalConversions || 0}
              icon={Target}
            />
            <StatCard
              title="Revenue"
              value={analytics?.totalRevenue || 0}
              icon={DollarSign}
              format="currency"
            />
            <StatCard
              title="Conversion Rate"
              value={analytics?.conversionRate || 0}
              icon={TrendingUp}
              format="percentage"
            />
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Analytics dashboard coming soon...</p>
            <Badge variant="outline" className="mt-2">Feature in development</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
