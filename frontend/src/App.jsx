import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { clearSession, getProfile, getSession, signOut } from "./lib/auth";
import {
  categories as initialCategories,
  products as initialProducts,
} from "./data/products";
import "./App.css";
import "./pages/styles/Auth.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import Team from "./pages/Team";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";

// ── Theme hook ─────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pitstop-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pitstop-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}

// Helper component to scroll to top on route change or jump to hash if present
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function RouteTransition({ children }) {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (location.pathname === displayedLocation.pathname) {
      return undefined;
    }

    setIsExiting(true);
    const transitionTimer = window.setTimeout(() => {
      setDisplayedLocation(location);
      setIsExiting(false);
    }, 180);

    return () => window.clearTimeout(transitionTimer);
  }, [displayedLocation.pathname, location]);

  return (
    <div className={`route-transition${isExiting ? " is-exiting" : ""}`}>
      {children(displayedLocation)}
    </div>
  );
}

function AdminGuard({ children }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const session = getSession();
    if (!session?.access_token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    getProfile(session)
      .then(({ profile }) => {
        if (profile?.role === "admin") {
          setStatus("allowed");
          return;
        }

        clearSession();
        navigate("/admin/login", { replace: true });
      })
      .catch(() => {
        clearSession();
        navigate("/admin/login", { replace: true });
      });
  }, [navigate]);

  if (status !== "allowed") {
    return (
      <div className="auth-page">
        <div className="auth-card-simple">
          <p className="auth-notice">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return children;
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [session, setSession] = useState(() => getSession());
  const catalog = {
    categories: initialCategories,
    products: initialProducts,
  };
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleAuthChange = () => setSession(getSession());
    window.addEventListener("pitstop-auth-changed", handleAuthChange);
    return () =>
      window.removeEventListener("pitstop-auth-changed", handleAuthChange);
  }, []);

  const handleAddToCart = () => {
    setCartCount((count) => count + 1);
  };

  const handleCartClick = () => {
    alert(
      `Pitstop Garage Cart: ${cartCount} items selected. Paddock checkout opening soon!`,
    );
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="site-shell">
      <ScrollToTop />
      {!isAdminRoute && (
        <Navbar
          search={search}
          setSearch={setSearch}
          cartCount={cartCount}
          onCartClick={handleCartClick}
          theme={theme}
          onToggleTheme={toggleTheme}
          session={session}
          onLogout={clearSession}
        />
      )}
      <RouteTransition>
        {(location) => (
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Home
                  search={search}
                  setSearch={setSearch}
                  onAddToCart={handleAddToCart}
                  categories={catalog.categories}
                  products={catalog.products}
                  isCatalogLoading={false}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/team" element={<Team />} />
            <Route
              path="/shop"
              element={
                <Shop
                  onAddToCart={handleAddToCart}
                  search={search}
                  setSearch={setSearch}
                  categories={catalog.categories}
                  products={catalog.products}
                  isCatalogLoading={false}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  onAddToCart={handleAddToCart}
                  products={catalog.products}
                  isCatalogLoading={false}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <Admin
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    session={getSession()}
                    onLogout={() =>
                      signOut(getSession()).then(() =>
                        navigate("/admin/login", { replace: true }),
                      )
                    }
                  />
                </AdminGuard>
              }
            />
            <Route
              path="*"
              element={
                <Home
                  search={search}
                  setSearch={setSearch}
                  onAddToCart={handleAddToCart}
                  categories={catalog.categories}
                  products={catalog.products}
                  isCatalogLoading={false}
                />
              }
            />
          </Routes>
        )}
      </RouteTransition>
      {!isAdminRoute && <Footer theme={theme} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
