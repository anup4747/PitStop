import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  products as initialProducts,
  categories as initialCategories,
} from "../data/products";
import navLogoDark from "../assets/navLogo.png";
import navLogoLight from "../assets/navLogolight.png";
import "./Admin.css";

// ── Initial Mock Data ──────────────────────────────────────
const initialOrders = [
  {
    id: "#1024",
    customer: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98201 44521",
    date: "19 Sep 2026",
    amount: 2450,
    payment: "Paid",
    status: "Processing",
    shippingAddress: "Flat 402, Apex Heights, Sector 18, Pune, MH - 411001",
    items: [
      { name: "Brake Disc (Laser Ventilated)", qty: 1, price: 1650 },
      { name: "Accelerator Cable Pro", qty: 1, price: 800 },
    ],
    shippingFee: 0,
  },
  {
    id: "#1023",
    customer: "Amit Verma",
    email: "amit.verma@karting.in",
    phone: "+91 98450 12890",
    date: "18 Sep 2026",
    amount: 1200,
    payment: "Paid",
    status: "Shipped",
    shippingAddress:
      "Plot 12, Paddock Road, Indiranagar, Bengaluru, KA - 560038",
    items: [{ name: "Kill Switch – Master Cutoff", qty: 2, price: 600 }],
    shippingFee: 0,
  },
  {
    id: "#1022",
    customer: "John D'Souza",
    email: "john.dsouza@trackday.com",
    phone: "+91 97112 55431",
    date: "18 Sep 2026",
    amount: 5800,
    payment: "Pending",
    status: "Pending",
    shippingAddress: "B-204, Sea Breeze Apts, Miramar, Panaji, Goa - 403001",
    items: [{ name: "Harness – 5-Point Camlock SFI", qty: 1, price: 5800 }],
    shippingFee: 0,
  },
  {
    id: "#1021",
    customer: "Priya Nair",
    email: "priya.nair@motorclub.org",
    phone: "+91 94471 90812",
    date: "17 Sep 2026",
    amount: 14500,
    payment: "Paid",
    status: "Delivered",
    shippingAddress: "14/220 Race Course Rd, Coimbatore, TN - 641018",
    items: [{ name: "Engine – Honda GX390 Race Spec", qty: 1, price: 14500 }],
    shippingFee: 0,
  },
  {
    id: "#1020",
    customer: "Karan Johar Patel",
    email: "karan.patel@gujaratmotors.in",
    phone: "+91 98250 88201",
    date: "16 Sep 2026",
    amount: 3600,
    payment: "Paid",
    status: "Confirmed",
    shippingAddress: "C-11, GIDC Engineering Estate, Vadodara, GJ - 390010",
    items: [{ name: "Rack & Pinion Steering Unit", qty: 1, price: 3600 }],
    shippingFee: 0,
  },
];

const initialCustomers = [
  {
    id: "c1",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98201 44521",
    ordersCount: 5,
    totalSpent: 12500,
    city: "Pune",
  },
  {
    id: "c2",
    name: "Amit Verma",
    email: "amit.verma@karting.in",
    phone: "+91 98450 12890",
    ordersCount: 2,
    totalSpent: 3200,
    city: "Bengaluru",
  },
  {
    id: "c3",
    name: "John D'Souza",
    email: "john.dsouza@trackday.com",
    phone: "+91 97112 55431",
    ordersCount: 1,
    totalSpent: 5800,
    city: "Goa",
  },
  {
    id: "c4",
    name: "Priya Nair",
    email: "priya.nair@motorclub.org",
    phone: "+91 94471 90812",
    ordersCount: 4,
    totalSpent: 28400,
    city: "Coimbatore",
  },
  {
    id: "c5",
    name: "Karan Patel",
    email: "karan.patel@gujaratmotors.in",
    phone: "+91 98250 88201",
    ordersCount: 3,
    totalSpent: 9100,
    city: "Vadodara",
  },
];

const initialWebsiteContent = {
  heroHeading: "Premium Go-Kart & Racing Parts",
  heroDescription:
    "High-performance powertrain, chassis, and brake components engineered for competition karts and serious drivers.",
  heroButtonText: "Shop The Collection",
  announcement:
    "Free shipping across India on orders over ₹4,999 • Track-tested quality",
  storeEmail: "support@pitstopsolutions.in",
  storePhone: "+91 (020) 4482-1920",
  storeAddress: "Unit 4, Speedline Industrial Park, Pimpri, Pune - 411018",
  gstNumber: "27AABCP1234F1Z8",
  currency: "₹ (INR)",
};

// ── Icons ──────────────────────────────────────────────────
const icon = (name) => {
  const paths = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
    products: (
      <>
        <path d="m21 8-9-4-9 4 9 4 9-4Z" />
        <path d="M3 8v8l9 4 9-4V8" />
        <path d="M12 12v8" />
      </>
    ),
    orders: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </>
    ),
    customers: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    inventory: (
      <>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </>
    ),
    content: (
      <>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    arrow: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    back: (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    trash: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
      </>
    ),
    menu: (
      <>
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </>
    ),
  };
  return (
    <svg
      className="admin-icon"
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

function Admin({ theme = "dark", onToggleTheme, onLogout, session }) {
  // Navigation State
  const [currentSection, setCurrentSection] = useState("Dashboard");
  const [productsSubView, setProductsSubView] = useState("All"); // 'All' | 'Add' | 'Categories'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const fullName = session?.user?.user_metadata?.full_name || "PitStop Admin";
  const email = session?.user?.email || "Admin account";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const closeSidebarOnSmallScreen = () => {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      setSidebarOpen(false);
    }
  };

  // Store Data States
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(
    initialCategories.filter((c) => c !== "All Parts"),
  );
  const [orders, setOrders] = useState(initialOrders);
  const [customers] = useState(initialCustomers);
  const [websiteContent, setWebsiteContent] = useState(initialWebsiteContent);

  // Modals & Drawers
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockQty, setRestockQty] = useState(10);
  const [restockReason, setRestockReason] = useState("New Purchase");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [savedBannerMsg, setSavedBannerMsg] = useState("");

  // Search & Filter States
  const [productQuery, setProductQuery] = useState("");
  const [productCatFilter, setProductCatFilter] = useState("All");
  const [productStockFilter, setProductStockFilter] = useState("All");
  const [orderQuery, setOrderQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "IC Powertrain",
    description: "",
    price: "",
    discountPrice: "",
    stockCount: 15,
    lowStockAlert: 5,
    brand: "Pitstop Race",
    material: "Alloy Steel",
    weight: "1.2 kg",
    compatibleKart: "Baja SAE / Cadet / Senior Kart",
    partNumber: "",
  });

  // Derived Metrics
  const totalSales = useMemo(
    () =>
      orders.reduce(
        (sum, o) => (o.payment === "Paid" ? sum + o.amount : sum),
        0,
      ),
    [orders],
  );
  const lowStockItems = useMemo(
    () => products.filter((p) => p.stockCount <= 6),
    [products],
  );

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !productQuery ||
        p.name.toLowerCase().includes(productQuery.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(productQuery.toLowerCase()));
      const matchesCat =
        productCatFilter === "All" || p.category === productCatFilter;
      const matchesStock =
        productStockFilter === "All"
          ? true
          : productStockFilter === "InStock"
            ? p.stockCount > 6
            : productStockFilter === "LowStock"
              ? p.stockCount > 0 && p.stockCount <= 6
              : p.stockCount === 0;
      return matchesQuery && matchesCat && matchesStock;
    });
  }, [products, productQuery, productCatFilter, productStockFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        !orderQuery ||
        o.id.toLowerCase().includes(orderQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(orderQuery.toLowerCase());
      const matchesStatus =
        orderStatusFilter === "All" || o.status === orderStatusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, orderQuery, orderStatusFilter]);

  // ── Actions ──────────────────────────────────────────────
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const created = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      sku: newProduct.sku || `PS-${Date.now().toString().slice(-4)}`,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: newProduct.discountPrice
        ? Number(newProduct.discountPrice)
        : undefined,
      stockCount: Number(newProduct.stockCount) || 10,
      shortDesc: newProduct.description || "High-performance racing component.",
      fullDesc: newProduct.description || "Engineered for competition karts.",
      badge: "In Stock",
      inStock: true,
      images: [],
      specs: {
        Brand: newProduct.brand,
        Material: newProduct.material,
        Weight: newProduct.weight,
        PartNumber:
          newProduct.partNumber || `PN-${Date.now().toString().slice(-5)}`,
      },
      compatible: newProduct.compatibleKart,
    };
    setProducts([created, ...products]);
    setNewProduct({
      name: "",
      sku: "",
      category: "IC Powertrain",
      description: "",
      price: "",
      discountPrice: "",
      stockCount: 15,
      lowStockAlert: 5,
      brand: "Pitstop Race",
      material: "Alloy Steel",
      weight: "1.2 kg",
      compatibleKart: "Baja SAE / Cadet / Senior Kart",
      partNumber: "",
    });
    setProductsSubView("All");
    showNotification("Product published successfully!");
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      showNotification("Product removed.");
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    showNotification(`Order ${orderId} marked as ${newStatus}`);
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockProduct) return;
    const addAmt = Number(restockQty) || 0;
    setProducts(
      products.map((p) =>
        p.id === restockProduct.id
          ? { ...p, stockCount: p.stockCount + addAmt, inStock: true }
          : p,
      ),
    );
    showNotification(`Added ${addAmt} units to ${restockProduct.name}`);
    setRestockProduct(null);
  };

  const handleSaveWebsiteContent = (e) => {
    e.preventDefault();
    showNotification("Website homepage and banners updated successfully!");
  };

  const showNotification = (msg) => {
    setSavedBannerMsg(msg);
    setTimeout(() => setSavedBannerMsg(""), 3500);
  };

  return (
    <div className="admin-shell">
      {/* ── Toast Notification ── */}
      {savedBannerMsg && (
        <div className="admin-toast">
          {icon("check")}
          <span>{savedBannerMsg}</span>
        </div>
      )}

      {/* ── Left Sidebar ── */}
      <div
        className={`admin-sidebar-backdrop ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}
        onClick={(event) => {
          if (event.target.closest("button, a")) closeSidebarOnSmallScreen();
        }}
      >
        {/* Brand Header */}
        <div className="admin-brand-wrapper">
          <Link
            to="/"
            className="admin-brand"
            aria-label="Pitstop Solutions Home"
          >
            <img
              src={theme === "light" ? navLogoLight : navLogoDark}
              alt="Pitstop Solutions"
              className="admin-brand-logo"
            />
          </Link>
          <div className="admin-brand-meta">
            <span className="admin-console-pill">Go-Kart Admin</span>
            <span className="admin-console-ver">v1.0</span>
          </div>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            {icon("close")}
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="admin-nav" aria-label="Admin Navigation">
          {/* Section: Overview */}
          <div className="admin-nav-section">
            <span className="admin-nav-section-title">Overview</span>
            <button
              type="button"
              className={`admin-nav-item ${currentSection === "Dashboard" ? "active" : ""}`}
              onClick={() => setCurrentSection("Dashboard")}
            >
              {icon("dashboard")}
              <span className="nav-label">Dashboard</span>
            </button>
          </div>

          {/* Section: Catalog & Operations */}
          <div className="admin-nav-section">
            <span className="admin-nav-section-title">Catalog & Sales</span>

            {/* Products with sub-links */}
            <div className="admin-nav-group">
              <button
                type="button"
                className={`admin-nav-item ${currentSection === "Products" ? "active" : ""}`}
                onClick={() => {
                  setCurrentSection("Products");
                  setProductsSubView("All");
                }}
              >
                {icon("products")}
                <span className="nav-label">Products</span>
                <span className="admin-nav-badge">{products.length}</span>
              </button>
              {currentSection === "Products" && (
                <div className="admin-sub-nav">
                  <button
                    type="button"
                    className={`sub-nav-btn ${productsSubView === "All" ? "active" : ""}`}
                    onClick={() => setProductsSubView("All")}
                  >
                    <span className="sub-nav-bullet" />
                    All Products
                  </button>
                  <button
                    type="button"
                    className={`sub-nav-btn ${productsSubView === "Add" ? "active" : ""}`}
                    onClick={() => setProductsSubView("Add")}
                  >
                    <span className="sub-nav-bullet" />+ Add Product
                  </button>
                  <button
                    type="button"
                    className={`sub-nav-btn ${productsSubView === "Categories" ? "active" : ""}`}
                    onClick={() => setProductsSubView("Categories")}
                  >
                    <span className="sub-nav-bullet" />
                    Categories
                  </button>
                </div>
              )}
            </div>

            {/* Orders */}
            <button
              type="button"
              className={`admin-nav-item ${currentSection === "Orders" ? "active" : ""}`}
              onClick={() => setCurrentSection("Orders")}
            >
              {icon("orders")}
              <span className="nav-label">Orders</span>
              <span className="admin-nav-badge">{orders.length}</span>
            </button>

            {/* Customers */}
            <button
              type="button"
              className={`admin-nav-item ${currentSection === "Customers" ? "active" : ""}`}
              onClick={() => setCurrentSection("Customers")}
            >
              {icon("customers")}
              <span className="nav-label">Customers</span>
            </button>

            {/* Inventory */}
            <button
              type="button"
              className={`admin-nav-item ${currentSection === "Inventory" ? "active" : ""}`}
              onClick={() => setCurrentSection("Inventory")}
            >
              {icon("inventory")}
              <span className="nav-label">Inventory</span>
              {lowStockItems.length > 0 && (
                <span className="admin-badge-alert">
                  {lowStockItems.length} Low
                </span>
              )}
            </button>
          </div>

          {/* Section: Store Management */}
          <div className="admin-nav-section">
            <span className="admin-nav-section-title">Store & Setup</span>

            {/* Website Content */}
            <button
              type="button"
              className={`admin-nav-item ${currentSection === "Website Content" ? "active" : ""}`}
              onClick={() => setCurrentSection("Website Content")}
            >
              {icon("content")}
              <span className="nav-label">Website Content</span>
            </button>

            {/* Settings */}
            <button
              type="button"
              className={`admin-nav-item ${currentSection === "Settings" ? "active" : ""}`}
              onClick={() => setCurrentSection("Settings")}
            >
              {icon("settings")}
              <span className="nav-label">Settings</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <Link
            to="/shop"
            className="sidebar-store-card"
            title="Open Go-Kart Parts Store"
          >
            <div className="sidebar-store-icon">{icon("back")}</div>
            <div className="sidebar-store-info">
              <span className="sidebar-store-name">Customer Shop</span>
              <span className="sidebar-store-action">View live catalog →</span>
            </div>
          </Link>

          <div className="sidebar-system-status">
            <span className="status-live-dot" />
            <span className="status-text">Store Online • Race Ready</span>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              aria-expanded={sidebarOpen}
            >
              {icon("menu")}
            </button>
            <span className="admin-view-breadcrumb">
              Admin / {currentSection}
            </span>
            <h1>{currentSection}</h1>
          </div>

          <div className="admin-topbar-right">
            {/* Theme Toggle Button */}
            <button
              className="admin-theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? icon("sun") : icon("moon")}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {/* Quick Link to Shop */}
            <Link to="/shop" className="admin-quick-shop-btn">
              <span>Customer Shop</span> {icon("arrow")}
            </Link>

            <div className="admin-profile-menu" ref={profileRef}>
              <button
                type="button"
                className={`admin-user-badge${profileOpen ? " active" : ""}`}
                onClick={() => setProfileOpen((isOpen) => !isOpen)}
                aria-label="Open admin profile menu"
                aria-expanded={profileOpen}
              >
                <span className="admin-user-avatar">{initials || "AD"}</span>
                <span className="admin-user-info">
                  <strong>{fullName}</strong>
                  <small>Store Owner</small>
                </span>
                {icon("chevronDown")}
              </button>

              {profileOpen && (
                <div className="admin-profile-dropdown" role="menu">
                  <div className="admin-profile-summary">
                    <span className="admin-user-avatar admin-user-avatar-large">
                      {initials || "AD"}
                    </span>
                    <div>
                      <strong>{fullName}</strong>
                      <span>{email}</span>
                    </div>
                  </div>
                  <div className="admin-profile-divider" />
                  <Link
                    to="/shop"
                    className="admin-profile-menu-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    {icon("back")}
                    <span>View storefront</span>
                  </Link>
                  <button
                    type="button"
                    className="admin-profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Account settings are coming soon.");
                    }}
                  >
                    {icon("settings")}
                    <span>Account settings</span>
                  </button>
                  <div className="admin-profile-divider" />
                  <button
                    type="button"
                    className="admin-profile-menu-item admin-profile-signout"
                    onClick={onLogout}
                  >
                    {icon("logout")}
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── View 1: DASHBOARD ── */}
        {currentSection === "Dashboard" && (
          <div className="admin-content-view">
            {/* Welcome banner */}
            <div className="dashboard-welcome-card">
              <div>
                <h2>Welcome, Admin 👋</h2>
                <p>
                  Here is your daily store overview. Keep low-stock parts
                  replenished to avoid missed sales.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  setCurrentSection("Products");
                  setProductsSubView("Add");
                }}
              >
                {icon("plus")} Add New Product
              </button>
            </div>

            {/* 4 Quick Stat Cards */}
            <div className="stat-cards-grid">
              <div
                className="stat-card"
                onClick={() => setCurrentSection("Orders")}
              >
                <div className="stat-icon-wrap orders-color">
                  {icon("orders")}
                </div>
                <div className="stat-info">
                  <span className="stat-label">Orders</span>
                  <strong className="stat-value">{orders.length}</strong>
                  <span className="stat-sub">3 pending fulfillment</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrap sales-color">
                  {icon("dashboard")}
                </div>
                <div className="stat-info">
                  <span className="stat-label">Sales</span>
                  <strong className="stat-value">
                    ₹{totalSales.toLocaleString("en-IN")}
                  </strong>
                  <span className="stat-sub">Paid online</span>
                </div>
              </div>

              <div
                className="stat-card"
                onClick={() => {
                  setCurrentSection("Products");
                  setProductsSubView("All");
                }}
              >
                <div className="stat-icon-wrap products-color">
                  {icon("products")}
                </div>
                <div className="stat-info">
                  <span className="stat-label">Products</span>
                  <strong className="stat-value">{products.length}</strong>
                  <span className="stat-sub">Active in catalog</span>
                </div>
              </div>

              <div
                className="stat-card"
                onClick={() => setCurrentSection("Customers")}
              >
                <div className="stat-icon-wrap customers-color">
                  {icon("customers")}
                </div>
                <div className="stat-info">
                  <span className="stat-label">Customers</span>
                  <strong className="stat-value">{customers.length}</strong>
                  <span className="stat-sub">Registered racers</span>
                </div>
              </div>
            </div>

            {/* Two Column Grid: Recent Orders + Low Stock Alert */}
            <div className="dashboard-grid-split">
              {/* Recent Orders Table */}
              <div className="admin-card recent-orders-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Recent Orders</h3>
                    <p>Latest customer purchases needing review</p>
                  </div>
                  <button
                    type="button"
                    className="admin-link-action"
                    onClick={() => setCurrentSection("Orders")}
                  >
                    View All Orders {icon("arrow")}
                  </button>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map((o) => (
                        <tr key={o.id}>
                          <td>
                            <strong>{o.id}</strong>
                          </td>
                          <td>{o.customer}</td>
                          <td>
                            <strong>₹{o.amount.toLocaleString("en-IN")}</strong>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${o.status.toLowerCase()}`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="table-btn-link"
                              onClick={() => setSelectedOrder(o)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low Stock Alert Section */}
              <div className="admin-card low-stock-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Low Stock Alert</h3>
                    <p>Replenish before inventory hits zero</p>
                  </div>
                  <button
                    type="button"
                    className="admin-link-action"
                    onClick={() => setCurrentSection("Inventory")}
                  >
                    All Inventory {icon("arrow")}
                  </button>
                </div>
                <div className="low-stock-list">
                  {lowStockItems.slice(0, 5).map((p) => (
                    <div className="low-stock-row" key={p.id}>
                      <div className="low-stock-thumb">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" />
                        ) : (
                          <span>PS</span>
                        )}
                      </div>
                      <div className="low-stock-meta">
                        <strong>{p.name}</strong>
                        <span>Category: {p.category}</span>
                      </div>
                      <div className="low-stock-action">
                        <span className="stock-count-warning">
                          {p.stockCount} left
                        </span>
                        <button
                          type="button"
                          className="btn-restock-sm"
                          onClick={() => setRestockProduct(p)}
                        >
                          + Add Stock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── View 2: PRODUCTS ── */}
        {currentSection === "Products" && (
          <div className="admin-content-view">
            {/* Products Sub-Navigation Tabs */}
            <div className="admin-subnav-tabs">
              <button
                type="button"
                className={productsSubView === "All" ? "active" : ""}
                onClick={() => setProductsSubView("All")}
              >
                All Products ({products.length})
              </button>
              <button
                type="button"
                className={productsSubView === "Add" ? "active" : ""}
                onClick={() => setProductsSubView("Add")}
              >
                + Add Product
              </button>
              <button
                type="button"
                className={productsSubView === "Categories" ? "active" : ""}
                onClick={() => setProductsSubView("Categories")}
              >
                Categories ({categories.length})
              </button>
            </div>

            {/* Sub-view: All Products */}
            {productsSubView === "All" && (
              <div className="admin-card">
                <div className="admin-table-toolbar">
                  <div className="search-input-wrap">
                    {icon("search")}
                    <input
                      type="text"
                      placeholder="Search products by name or SKU..."
                      value={productQuery}
                      onChange={(e) => setProductQuery(e.target.value)}
                    />
                  </div>

                  <div className="filter-select-group">
                    <select
                      value={productCatFilter}
                      onChange={(e) => setProductCatFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    <select
                      value={productStockFilter}
                      onChange={(e) => setProductStockFilter(e.target.value)}
                    >
                      <option value="All">All Stock Levels</option>
                      <option value="InStock">In Stock (&gt; 6)</option>
                      <option value="LowStock">Low Stock (1 - 6)</option>
                      <option value="Out">Out of Stock (0)</option>
                    </select>

                    <button
                      type="button"
                      className="admin-btn-primary"
                      onClick={() => setProductsSubView("Add")}
                    >
                      {icon("plus")} Add Product
                    </button>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="product-table-cell">
                              <div className="product-mini-thumb">
                                {p.images?.[0] ? (
                                  <img src={p.images[0]} alt="" />
                                ) : (
                                  <span>PS</span>
                                )}
                              </div>
                              <div>
                                <strong>{p.name}</strong>
                                <small>{p.sku || "PS-PART"}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="category-pill">{p.category}</span>
                          </td>
                          <td>
                            <strong>₹{p.price.toLocaleString("en-IN")}</strong>
                          </td>
                          <td>
                            <span
                              className={
                                p.stockCount <= 5 ? "stock-qty-low" : ""
                              }
                            >
                              {p.stockCount} units
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${p.stockCount > 0 ? "active" : "out"}`}
                            >
                              {p.stockCount > 0 ? "Active" : "Out of Stock"}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="action-icon-btn"
                                title="Restock item"
                                onClick={() => setRestockProduct(p)}
                              >
                                {icon("plus")}
                              </button>
                              <button
                                type="button"
                                className="action-icon-btn delete"
                                title="Delete product"
                                onClick={() => handleDeleteProduct(p.id)}
                              >
                                {icon("trash")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-view: Add Product Form */}
            {productsSubView === "Add" && (
              <div className="admin-card product-form-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Add New Kart Product</h3>
                    <p>
                      Fill in details for your parts listing. Only required
                      fields are marked with *.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => setProductsSubView("All")}
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="new-product-form">
                  {/* Section 1: Information */}
                  <fieldset className="form-fieldset">
                    <legend>1. Product Information</legend>
                    <div className="form-grid-2">
                      <label className="form-field">
                        <span>Product Name *</span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Redline Pro Brake Disc Rotor"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="form-field">
                        <span>SKU / Part Code</span>
                        <input
                          type="text"
                          placeholder="e.g. PS-BRK-DSC01"
                          value={newProduct.sku}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              sku: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="form-grid-2">
                      <label className="form-field">
                        <span>Category *</span>
                        <select
                          value={newProduct.category}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              category: e.target.value,
                            })
                          }
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="form-field">
                        <span>Part Number</span>
                        <input
                          type="text"
                          placeholder="e.g. PN-4130-ROT"
                          value={newProduct.partNumber}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              partNumber: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>

                    <label className="form-field">
                      <span>Description</span>
                      <textarea
                        rows="3"
                        placeholder="Laser-ventilated floating rotor with twin-piston calipers designed for high endurance kart racing..."
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </label>
                  </fieldset>

                  {/* Section 2: Pricing & Inventory */}
                  <fieldset className="form-fieldset">
                    <legend>2. Pricing & Inventory</legend>
                    <div className="form-grid-3">
                      <label className="form-field">
                        <span>Selling Price (₹) *</span>
                        <input
                          type="number"
                          required
                          min="1"
                          placeholder="e.g. 1850"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="form-field">
                        <span>Discounted Price / MRP (₹)</span>
                        <input
                          type="number"
                          placeholder="e.g. 2100"
                          value={newProduct.discountPrice}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              discountPrice: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="form-field">
                        <span>Initial Stock Quantity *</span>
                        <input
                          type="number"
                          required
                          min="0"
                          placeholder="15"
                          value={newProduct.stockCount}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stockCount: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Section 3: Specifications */}
                  <fieldset className="form-fieldset">
                    <legend>3. Specifications (Optional)</legend>
                    <div className="form-grid-3">
                      <label className="form-field">
                        <span>Brand</span>
                        <input
                          type="text"
                          value={newProduct.brand}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              brand: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="form-field">
                        <span>Material</span>
                        <input
                          type="text"
                          value={newProduct.material}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              material: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="form-field">
                        <span>Weight</span>
                        <input
                          type="text"
                          value={newProduct.weight}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              weight: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                    <label className="form-field">
                      <span>Compatible Kart / Series</span>
                      <input
                        type="text"
                        placeholder="Rotax Max / Baja SAE / Senior Karting"
                        value={newProduct.compatibleKart}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            compatibleKart: e.target.value,
                          })
                        }
                      />
                    </label>
                  </fieldset>

                  <div className="form-actions-row">
                    <button type="submit" className="admin-btn-primary">
                      {icon("check")} Save Product
                    </button>
                    <button
                      type="button"
                      className="admin-btn-secondary"
                      onClick={() => setProductsSubView("All")}
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Sub-view: Categories */}
            {productsSubView === "Categories" && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3>Kart Part Categories</h3>
                    <p>Organize products for easy navigation in your store.</p>
                  </div>
                  <button
                    type="button"
                    className="admin-btn-primary"
                    onClick={() => {
                      const name = window.prompt("Enter new category name:");
                      if (name && !categories.includes(name)) {
                        setCategories([...categories, name]);
                        showNotification(`Category "${name}" added.`);
                      }
                    }}
                  >
                    {icon("plus")} Add Category
                  </button>
                </div>

                <div className="categories-list-grid">
                  {categories.map((cat) => {
                    const count = products.filter(
                      (p) => p.category === cat,
                    ).length;
                    return (
                      <div className="category-card" key={cat}>
                        <div className="category-card-info">
                          <h4>{cat}</h4>
                          <span>{count} parts assigned</span>
                        </div>
                        <div className="category-card-actions">
                          <span className="status-pill active">Active</span>
                          <button
                            type="button"
                            className="action-icon-btn delete"
                            title="Delete category"
                            onClick={() => {
                              if (window.confirm(`Remove category "${cat}"?`)) {
                                setCategories(
                                  categories.filter((c) => c !== cat),
                                );
                              }
                            }}
                          >
                            {icon("trash")}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── View 3: ORDERS ── */}
        {currentSection === "Orders" && (
          <div className="admin-content-view">
            <div className="admin-card">
              <div className="admin-table-toolbar">
                <div className="search-input-wrap">
                  {icon("search")}
                  <input
                    type="text"
                    placeholder="Search by Order ID (#1024) or Customer..."
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                  />
                </div>

                <div className="filter-select-group">
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id}>
                        <td>
                          <strong>{o.id}</strong>
                        </td>
                        <td>
                          <div>
                            <strong>{o.customer}</strong>
                            <small>{o.email}</small>
                          </div>
                        </td>
                        <td>{o.date}</td>
                        <td>
                          <strong>₹{o.amount.toLocaleString("en-IN")}</strong>
                        </td>
                        <td>
                          <span
                            className={`payment-pill ${o.payment.toLowerCase()}`}
                          >
                            {o.payment}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${o.status.toLowerCase()}`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="admin-btn-secondary btn-sm"
                            onClick={() => setSelectedOrder(o)}
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── View 4: CUSTOMERS ── */}
        {currentSection === "Customers" && (
          <div className="admin-content-view">
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3>Customer Directory</h3>
                  <p>Racers and team buyers who have ordered parts.</p>
                </div>
                <span className="header-meta-pill">
                  {customers.length} Customers
                </span>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Location</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <strong>{c.name}</strong>
                        </td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{c.city}</td>
                        <td>
                          <strong>{c.ordersCount} orders</strong>
                        </td>
                        <td>
                          <strong>
                            ₹{c.totalSpent.toLocaleString("en-IN")}
                          </strong>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="table-btn-link"
                            onClick={() => setSelectedCustomer(c)}
                          >
                            Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── View 5: INVENTORY ── */}
        {currentSection === "Inventory" && (
          <div className="admin-content-view">
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3>Stock & Parts Replenishment</h3>
                  <p>
                    Dedicated warehouse view for monitoring physical parts
                    availability.
                  </p>
                </div>
                <div className="inventory-summary-pills">
                  <span className="inv-badge green">
                    {products.filter((p) => p.stockCount > 6).length} In Stock
                  </span>
                  <span className="inv-badge orange">
                    {lowStockItems.length} Low Stock
                  </span>
                  <span className="inv-badge red">
                    {products.filter((p) => p.stockCount === 0).length} Out of
                    Stock
                  </span>
                </div>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Status</th>
                      <th>Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const isLow = p.stockCount > 0 && p.stockCount <= 6;
                      const isOut = p.stockCount === 0;
                      return (
                        <tr key={p.id}>
                          <td>
                            <div className="product-table-cell">
                              <div className="product-mini-thumb">
                                {p.images?.[0] ? (
                                  <img src={p.images[0]} alt="" />
                                ) : (
                                  <span>PS</span>
                                )}
                              </div>
                              <strong>{p.name}</strong>
                            </div>
                          </td>
                          <td>{p.category}</td>
                          <td>
                            <strong
                              className={
                                isLow
                                  ? "stock-qty-low"
                                  : isOut
                                    ? "stock-qty-out"
                                    : ""
                              }
                            >
                              {p.stockCount} units
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${
                                isOut ? "out" : isLow ? "low" : "active"
                              }`}
                            >
                              {isOut
                                ? "Out of Stock"
                                : isLow
                                  ? "Low Stock"
                                  : "In Stock"}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="admin-btn-primary btn-sm"
                              onClick={() => setRestockProduct(p)}
                            >
                              {icon("plus")} Add Stock
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── View 6: WEBSITE CONTENT ── */}
        {currentSection === "Website Content" && (
          <div className="admin-content-view">
            <div className="admin-card content-editor-card">
              <div className="admin-card-header">
                <div>
                  <h3>Homepage & Storefront Editor</h3>
                  <p>
                    Update banner copy and hero promotions without touching any
                    code.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSaveWebsiteContent}
                className="content-edit-form"
              >
                <div className="form-section-block">
                  <h4>Announcement Bar</h4>
                  <label className="form-field">
                    <span>Announcement Bar Text</span>
                    <input
                      type="text"
                      value={websiteContent.announcement}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          announcement: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div className="form-section-block">
                  <h4>Hero Section</h4>
                  <label className="form-field">
                    <span>Hero Heading</span>
                    <input
                      type="text"
                      value={websiteContent.heroHeading}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          heroHeading: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="form-field">
                    <span>Hero Subtitle / Description</span>
                    <textarea
                      rows="3"
                      value={websiteContent.heroDescription}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          heroDescription: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="form-field">
                    <span>Call To Action Button Text</span>
                    <input
                      type="text"
                      value={websiteContent.heroButtonText}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          heroButtonText: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div className="form-actions-row">
                  <button type="submit" className="admin-btn-primary">
                    {icon("check")} Save Changes
                  </button>
                  <Link to="/" className="admin-btn-secondary">
                    Preview On Live Site
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── View 7: SETTINGS ── */}
        {currentSection === "Settings" && (
          <div className="admin-content-view">
            <div className="settings-grid">
              {/* Store Profile */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Store Settings</h3>
                </div>
                <div className="settings-form-body">
                  <label className="form-field">
                    <span>Store Name</span>
                    <input
                      type="text"
                      defaultValue="Pitstop Solutions - Go-Kart Parts"
                    />
                  </label>
                  <label className="form-field">
                    <span>Support Email</span>
                    <input
                      type="email"
                      defaultValue={websiteContent.storeEmail}
                    />
                  </label>
                  <label className="form-field">
                    <span>Support Phone</span>
                    <input
                      type="text"
                      defaultValue={websiteContent.storePhone}
                    />
                  </label>
                  <label className="form-field">
                    <span>GST Number</span>
                    <input
                      type="text"
                      defaultValue={websiteContent.gstNumber}
                    />
                  </label>
                  <label className="form-field">
                    <span>Store Currency</span>
                    <select defaultValue="INR">
                      <option value="INR">₹ - Indian Rupee (INR)</option>
                      <option value="USD">$ - US Dollar (USD)</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Shipping Rules */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Shipping Settings</h3>
                </div>
                <div className="settings-form-body">
                  <label className="form-field">
                    <span>Shipping Method</span>
                    <input
                      type="text"
                      defaultValue="Standard Surface Express (India)"
                    />
                  </label>
                  <label className="form-field">
                    <span>Standard Shipping Charge (₹)</span>
                    <input type="number" defaultValue="250" />
                  </label>
                  <label className="form-field">
                    <span>Free Shipping Above (₹)</span>
                    <input type="number" defaultValue="4999" />
                  </label>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Payment Gateways</h3>
                </div>
                <div className="settings-form-body">
                  <div className="gateway-toggle-row">
                    <div>
                      <strong>Razorpay / UPI / Cards</strong>
                      <small>
                        Accept GPay, PhonePe, Netbanking, Credit Cards
                      </small>
                    </div>
                    <span className="status-pill active">Enabled</span>
                  </div>
                  <div className="gateway-toggle-row">
                    <div>
                      <strong>Cash On Delivery (COD)</strong>
                      <small>Pay upon parts arrival</small>
                    </div>
                    <span className="status-pill active">Enabled</span>
                  </div>
                </div>
              </div>

              {/* Admin Account */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Admin Account</h3>
                </div>
                <div className="settings-form-body">
                  <label className="form-field">
                    <span>Admin Name</span>
                    <input type="text" defaultValue="Paddock Administrator" />
                  </label>
                  <label className="form-field">
                    <span>Admin Email</span>
                    <input
                      type="email"
                      defaultValue="admin@pitstopsolutions.in"
                    />
                  </label>
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() =>
                      showNotification(
                        "Password reset email sent to your inbox.",
                      )
                    }
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Order Details Modal ── */}
      {selectedOrder && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedOrder(null)}
        >
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Order {selectedOrder.id}</h2>
                <p>Placed on {selectedOrder.date}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                {icon("close")}
              </button>
            </div>

            <div className="modal-body">
              {/* Customer summary */}
              <div className="order-details-grid">
                <div className="order-info-block">
                  <span className="block-title">Customer</span>
                  <strong>{selectedOrder.customer}</strong>
                  <span>{selectedOrder.phone}</span>
                  <span>{selectedOrder.email}</span>
                </div>
                <div className="order-info-block">
                  <span className="block-title">Shipping Address</span>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Products list */}
              <div className="order-items-table">
                <span className="block-title">Items in Order</span>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>x{item.qty}</td>
                        <td>
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="order-calculation">
                <div className="calc-row">
                  <span>Subtotal:</span>
                  <strong>
                    ₹{selectedOrder.amount.toLocaleString("en-IN")}
                  </strong>
                </div>
                <div className="calc-row">
                  <span>Shipping:</span>
                  <span>
                    {selectedOrder.shippingFee === 0
                      ? "FREE"
                      : `₹${selectedOrder.shippingFee}`}
                  </span>
                </div>
                <div className="calc-row total">
                  <span>Total:</span>
                  <strong>
                    ₹{selectedOrder.amount.toLocaleString("en-IN")}
                  </strong>
                </div>
                <div className="calc-row payment">
                  <span>Payment Status:</span>
                  <span
                    className={`payment-pill ${selectedOrder.payment.toLowerCase()}`}
                  >
                    {selectedOrder.payment}
                  </span>
                </div>
              </div>

              {/* Status updater */}
              <div className="order-status-changer">
                <label>
                  <span>Order Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      handleUpdateOrderStatus(selectedOrder.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => setSelectedOrder(null)}
              >
                Close Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Add Stock Modal ── */}
      {restockProduct && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setRestockProduct(null)}
        >
          <div
            className="admin-modal-box sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Add Stock</h2>
                <p>{restockProduct.name}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setRestockProduct(null)}
              >
                {icon("close")}
              </button>
            </div>

            <form onSubmit={handleRestockSubmit} className="modal-body">
              <div className="restock-meta-box">
                <span>Current In-Stock Quantity:</span>
                <strong>{restockProduct.stockCount} units</strong>
              </div>

              <label className="form-field">
                <span>Units to Add *</span>
                <input
                  type="number"
                  required
                  min="1"
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                />
              </label>

              <label className="form-field">
                <span>Restock Reason</span>
                <select
                  value={restockReason}
                  onChange={(e) => setRestockReason(e.target.value)}
                >
                  <option value="New Purchase">
                    New Purchase / Vendor Shipment
                  </option>
                  <option value="Return">Customer Return / Restock</option>
                  <option value="Inventory Adjustment">
                    Manual Inventory Count Adjustment
                  </option>
                </select>
              </label>

              <div className="modal-footer">
                <button type="submit" className="admin-btn-primary">
                  {icon("check")} Update Stock
                </button>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setRestockProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Customer Details Modal ── */}
      {selectedCustomer && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="admin-modal-box sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>{selectedCustomer.name}</h2>
                <p>Customer #{selectedCustomer.id}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedCustomer(null)}
              >
                {icon("close")}
              </button>
            </div>
            <div className="modal-body">
              <div className="customer-info-list">
                <div>
                  <span>Email:</span> <strong>{selectedCustomer.email}</strong>
                </div>
                <div>
                  <span>Phone:</span> <strong>{selectedCustomer.phone}</strong>
                </div>
                <div>
                  <span>Location:</span>{" "}
                  <strong>{selectedCustomer.city}</strong>
                </div>
                <div>
                  <span>Total Orders:</span>{" "}
                  <strong>{selectedCustomer.ordersCount}</strong>
                </div>
                <div>
                  <span>Total Spent:</span>{" "}
                  <strong>
                    ₹{selectedCustomer.totalSpent.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => setSelectedCustomer(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
