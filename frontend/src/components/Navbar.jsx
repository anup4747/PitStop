import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import navLogoDark from "../assets/navLogo.png";
import navLogoLight from "../assets/navLogolight.png";

const icon = (name) => {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2 11h11l2-8H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18M6 6l12 12" />
      </>
    ),
    user: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    moon: (
      <>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </>
    ),
  };
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

function Navbar({
  search,
  setSearch,
  cartCount,
  onCartClick,
  theme,
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== "/shop") {
      navigate("/shop");
    }
  };

  const isShopActive =
    location.pathname === "/shop" || location.pathname.startsWith("/product/");
  const isTeamActive = location.pathname === "/team";

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement">
        Free shipping on orders over $150 <span>•</span> Built for the racing
        line
      </div>

      {/* Header */}
      <header className="site-header">
        <Link
          className="brand"
          to="/"
          aria-label="Pitstop Solutions home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={theme === "light" ? navLogoLight : navLogoDark}
            alt="Pitstop Solutions"
            className="nav-logo-img"
          />
        </Link>

        <nav
          id="mobile-navigation"
          className={menuOpen ? "main-nav open" : "main-nav"}
        >
          <Link
            to="/shop"
            className={isShopActive ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Shop parts
          </Link>
          <a
            href="#why-us"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#why-us");
            }}
          >
            Why Pitstop
          </a>
          <a
            href="#journal"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#journal");
            }}
          >
            Racing journal
          </a>
          <Link
            to="/team"
            className={isTeamActive ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Team Crew
          </Link>

          <div className="nav-mobile-auth">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mobile-auth-btn"
            >
              Driver Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="mobile-auth-btn primary"
            >
              Join Grid
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            {icon("search")}
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search parts"
              aria-label="Search parts"
            />
          </label>

          <Link
            to="/login"
            className={`auth-header-btn ${location.pathname === "/login" || location.pathname === "/signup" ? "active" : ""}`}
            title="Driver Paddock Login"
          >
            {icon("user")}
            <span className="auth-btn-text">LOGIN</span>
          </Link>

          {/* Dark / Light Mode Toggle */}
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? icon("sun") : icon("moon")}
          </button>

          <button
            className="cart-button"
            type="button"
            onClick={onCartClick}
            aria-label={`Cart with ${cartCount} items`}
          >
            {icon("cart")}
            <span>{cartCount}</span>
          </button>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? icon("close") : icon("menu")}
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
