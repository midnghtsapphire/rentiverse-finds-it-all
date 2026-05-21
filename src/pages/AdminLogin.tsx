import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header onSearch={(term) => navigate(`/?q=${encodeURIComponent(term.toLowerCase())}`)} />
      <main className="container mx-auto flex-1 px-4 py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Admin login
          </p>
          <h1 className="mb-4 text-4xl font-bold">Open the Rentiverse admin panel securely</h1>
          <p className="text-muted-foreground">
            Admin access is tied to Supabase authentication plus the approved admin email list in the existing database.
          </p>
        </div>
        <AuthForm mode="admin" />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
