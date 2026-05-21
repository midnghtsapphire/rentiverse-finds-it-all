import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, ShoppingCart, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AuthFormProps {
  mode?: "user" | "admin";
}

const iconByMode = {
  user: UserRound,
  admin: ShieldCheck,
} as const;

const redirectByMode = {
  user: "/checkout",
  admin: "/admin",
} as const;

const titleByMode = {
  user: "Account access",
  admin: "Admin access",
} as const;

const descriptionByMode = {
  user: "Sign in to manage bookings, checkout, and saved rental activity.",
  admin: "Sign in with an approved admin account to manage listings, partners, and analytics.",
} as const;

const AuthForm = ({ mode = "user" }: AuthFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, signUp, signOut, checkAdminAccess } = useAuth();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Icon = iconByMode[mode];

  const nextPath = (location.state as { from?: string } | null)?.from ?? redirectByMode[mode];

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await signIn(signInEmail, signInPassword);

      if (mode === "admin") {
        const hasAdminAccess = await checkAdminAccess(user.email);
        if (!hasAdminAccess) {
          await signOut();
          throw new Error("This account is not approved for the admin panel.");
        }
      }

      toast({
        title: mode === "admin" ? "Admin login successful" : "Signed in",
        description: mode === "admin" ? "Opening the admin dashboard." : "Your Rentiverse account is ready.",
      });
      navigate(nextPath);
    } catch (error) {
      toast({
        title: "Unable to sign in",
        description: error instanceof Error ? error.message : "Please verify your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await signUp(signUpEmail, signUpPassword);
      toast({
        title: "Account created",
        description: "Check your email if confirmation is required, then sign in to continue.",
      });
      setSignInEmail(signUpEmail);
      setSignUpPassword("");
    } catch (error) {
      toast({
        title: "Unable to create account",
        description: error instanceof Error ? error.message : "Please review the form and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-xl border-border/60 shadow-xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <CardTitle className="text-3xl">{titleByMode[mode]}</CardTitle>
          <CardDescription className="mt-2 text-base">{descriptionByMode[mode]}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sign-in" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign in</TabsTrigger>
            <TabsTrigger value="sign-up">Create account</TabsTrigger>
          </TabsList>

          <TabsContent value="sign-in">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${mode}-sign-in-email`}>Email</Label>
                <Input
                  id={`${mode}-sign-in-email`}
                  type="email"
                  value={signInEmail}
                  onChange={(event) => setSignInEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${mode}-sign-in-password`}>Password</Label>
                <Input
                  id={`${mode}-sign-in-password`}
                  type="password"
                  value={signInPassword}
                  onChange={(event) => setSignInPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {mode === "admin" ? "Open admin panel" : "Continue to Rentiverse"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="sign-up">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${mode}-sign-up-email`}>Email</Label>
                <Input
                  id={`${mode}-sign-up-email`}
                  type="email"
                  value={signUpEmail}
                  onChange={(event) => setSignUpEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${mode}-sign-up-password`}>Password</Label>
                <Input
                  id={`${mode}-sign-up-password`}
                  type="password"
                  value={signUpPassword}
                  onChange={(event) => setSignUpPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </div>
              <Button type="submit" variant="outline" className="w-full" disabled={isSubmitting}>
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {mode === "user" ? (
          <div className="mt-6 rounded-2xl border bg-slate-50 p-4 text-sm text-slate-600">
            <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
              <ShoppingCart className="h-4 w-4 text-primary" />
              Checkout-ready account flow
            </div>
            Use your account to move from cart to checkout, keep order details together, and hand off cleanly to Stripe once the payment link is configured.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AuthForm;
