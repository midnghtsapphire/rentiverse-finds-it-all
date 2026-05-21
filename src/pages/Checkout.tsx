import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canUseStripe = Boolean(stripePaymentLink);
  const cartSummary = useMemo(
    () => items.map((item) => `${item.title} (${item.rentalDays} day)`).join(", "),
    [items],
  );

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user?.email) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    if (!canUseStripe) {
      toast({
        title: "Stripe checkout is not configured yet",
        description: "Set VITE_STRIPE_PAYMENT_LINK to complete the live payment handoff.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    sessionStorage.setItem(
      "rentiverse-checkout-draft",
      JSON.stringify({
        fullName,
        phone,
        email: user.email,
        cartSummary,
        subtotal,
      }),
    );
    clearCart();
    window.location.assign(stripePaymentLink);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header onSearch={(term) => navigate(`/?q=${encodeURIComponent(term.toLowerCase())}`)} />
      <main className="container mx-auto flex-1 px-4 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Checkout</p>
          <h1 className="text-4xl font-bold">Route the cart into a Stripe-ready checkout flow</h1>
          <p className="mt-3 text-muted-foreground">
            This flow keeps login, cart, and payment handoff together so every website app includes the same production path to purchase.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Checkout details</CardTitle>
              <CardDescription>
                {user?.email
                  ? `Signed in as ${user.email}`
                  : "Sign in to continue. Checkout is connected to the user account flow."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-8 text-center">
                  <p className="font-medium">Your cart is empty.</p>
                  <Button className="mt-4" onClick={() => navigate("/")}>
                    Add rentals first
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="checkout-name">Full name</Label>
                    <Input
                      id="checkout-name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Alex Rentiverse"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout-phone">Phone</Label>
                    <Input
                      id="checkout-phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="(555) 555-5555"
                      required
                    />
                  </div>
                  <div className="rounded-2xl border bg-slate-50 p-4 text-sm text-slate-600">
                    <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Stripe integration standard
                    </div>
                    {canUseStripe
                      ? "A Stripe payment link is configured, so the checkout button will hand off to Stripe after this step."
                      : "Set VITE_STRIPE_PAYMENT_LINK in the environment to activate the live Stripe handoff for this app."}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting || items.length === 0}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {canUseStripe ? "Continue to Stripe" : "Stripe setup required"}
                  </Button>
                  {!user ? (
                    <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/login", { state: { from: "/checkout" } })}>
                      Sign in to continue
                    </Button>
                  ) : null}
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.listingId} className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.rentalDays} day(s)</p>
                  </div>
                  <p>${(item.pricePerDay * item.rentalDays).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between border-t pt-4 text-base font-semibold">
                <span>Total due</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
