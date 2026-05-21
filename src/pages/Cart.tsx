import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { placeholderListingImage } from "@/data/marketplace";

const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, removeItem, updateRentalDays } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header onSearch={(term) => navigate(`/?q=${encodeURIComponent(term.toLowerCase())}`)} />
      <main className="container mx-auto flex-1 px-4 py-16">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Cart</p>
            <h1 className="text-4xl font-bold">Review your rental cart</h1>
            <p className="mt-3 text-muted-foreground">
              Keep a clean cart flow in every storefront so renters can move from discovery to Stripe checkout with minimal friction.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Continue browsing
          </Button>
        </div>

        {items.length === 0 ? (
          <Card className="mx-auto max-w-2xl text-center">
            <CardContent className="py-16">
              <ShoppingBag className="mx-auto h-14 w-14 text-primary" />
              <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-3 text-muted-foreground">
                Add a rental to start the checkout flow and test the Stripe handoff.
              </p>
              <Button className="mt-6" onClick={() => navigate("/")}>
                Explore rentals
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.listingId}>
                  <CardContent className="flex flex-col gap-4 p-5 md:flex-row">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-36 w-full rounded-2xl object-cover md:w-56"
                      onError={(event) => {
                        event.currentTarget.src = placeholderListingImage(item.title, item.category);
                      }}
                    />
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-primary/70">{item.category}</p>
                        <h2 className="mt-1 text-xl font-semibold">{item.title}</h2>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </div>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateRentalDays(item.listingId, item.rentalDays - 1)}
                            aria-label={`Decrease rental days for ${item.title}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="min-w-24 text-center">
                            <p className="text-sm font-medium">{item.rentalDays} day(s)</p>
                            <p className="text-xs text-muted-foreground">${item.pricePerDay}/day</p>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateRentalDays(item.listingId, item.rentalDays + 1)}
                            aria-label={`Increase rental days for ${item.title}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-semibold text-primary">
                            ${(item.pricePerDay * item.rentalDays).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.listingId)}
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Service prep</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between border-t pt-4 text-base font-semibold">
                  <span>Estimated total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={() => navigate("/checkout")}>
                  Continue to checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
