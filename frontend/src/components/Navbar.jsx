import { useEffect, useRef, useState } from "react";
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
    chevron: <path d="m6 9 6 6 6-6" />,
    package: (
      <>
        <path d="m16.5 9.4-9-5.19" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.01A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.01A1.65 1.65 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15Z" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
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
  session,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    setProfileOpen(false);
    window.location.reload();
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
  const user = session?.user;
  const fullName = user?.user_metadata?.full_name || "Driver";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
            {session ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mobile-auth-btn"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mobile-auth-btn"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="mobile-auth-btn primary"
                >
                  Sign up
                </Link>
              </>
            )}
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

          {session ? (
            <div className="profile-menu" ref={profileRef}>
              <button
                type="button"
                className={`profile-trigger${profileOpen ? " active" : ""}`}
                onClick={() => setProfileOpen((isOpen) => !isOpen)}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <span className="profile-avatar">{initials || "DR"}</span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown" role="menu">
                  <div className="profile-summary">
                    <span className="profile-avatar profile-avatar-large">
                      {initials || "DR"}
                    </span>
                    <div>
                      <strong>{fullName}</strong>
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  <div className="profile-divider" />
                  <Link
                    to="/shop"
                    role="menuitem"
                    className="profile-menu-item"
                  >
                    {icon("package")}
                    <span>Browse parts</span>
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    className="profile-menu-item"
                    onClick={onCartClick}
                  >
                    {icon("cart")}
                    <span>
                      My cart <small>{cartCount} items</small>
                    </span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="profile-menu-item"
                    onClick={() =>
                      alert(
                        "Order history will appear here after your first checkout.",
                      )
                    }
                  >
                    {icon("package")}
                    <span>Order history</span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="profile-menu-item"
                    onClick={() => alert("Account settings are coming soon.")}
                  >
                    {icon("settings")}
                    <span>Account settings</span>
                  </button>
                  <div className="profile-divider" />
                  <button
                    type="button"
                    role="menuitem"
                    className="profile-menu-item profile-signout"
                    onClick={handleLogout}
                  >
                    {icon("logout")}
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`auth-header-btn ${location.pathname === "/login" || location.pathname === "/signup" ? "active" : ""}`}
              title="Driver Paddock Login"
            >
              {icon("user")}
              <span className="auth-btn-text">LOGIN</span>
            </Link>
          )}

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
