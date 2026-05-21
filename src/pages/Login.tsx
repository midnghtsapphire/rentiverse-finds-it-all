import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header onSearch={(term) => navigate(`/?q=${encodeURIComponent(term.toLowerCase())}`)} />
      <main className="container mx-auto flex-1 px-4 py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            User login
          </p>
          <h1 className="mb-4 text-4xl font-bold">Sign in before you checkout or manage bookings</h1>
          <p className="text-muted-foreground">
            Rentiverse now includes a standard account flow so every marketplace build has a clear path for customer authentication.
          </p>
        </div>
        <AuthForm mode="user" />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
