import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products";
import "./ProductDetail.css";
import "./Shop.css";

const icon = (name) => {
  const paths = {
    arrowLeft: (
      <>
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2 11h11l2-8H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    truck: (
      <>
        <rect width="16" height="13" x="1" y="3" rx="2" />
        <polygon points="17 8 20 8 23 11 23 16 17 16 17 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    wrench: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  };
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProductById(id), [id]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(() => {
    return product?.options?.values?.[0] || null;
  });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'compat' | 'maintenance'

  // Sync option when product changes
  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      if (product?.options?.values?.length) {
        setSelectedOption(product.options.values[0]);
      }
      setActiveImageIndex(0);
      setQuantity(1);
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product.id, product.category, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div style={{ padding: "80px 6vw", textAlign: "center" }}>
          <h1
            style={{
              font: "800 48px var(--font-display)",
              textTransform: "uppercase",
            }}
          >
            Part Not Found In Paddock
          </h1>
          <p
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              marginBottom: 24,
            }}
          >
            The requested race component does not exist in our telemetry
            catalog.
          </p>
          <button
            type="button"
            className="button button-red"
            onClick={() => navigate("/shop")}
          >
            Return to Parts Paddock
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart();
      }
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleQtyChange = (delta) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + delta, product.stockCount || 10)),
    );
  };

  const handleImageChange = (direction) => {
    const imageCount = product.images?.length || 1;
    setActiveImageIndex((currentIndex) =>
      (currentIndex + direction + imageCount) % imageCount,
    );
  };

  return (
    <div className="product-detail-page">
      {/* ── Sub Navigation & Breadcrumbs ── */}
      <nav className="pd-nav-bar" aria-label="Product navigation">
        <Link to="/shop" className="pd-back-link">
          {icon("arrowLeft")} Back to Paddock Catalog
        </Link>

        <div className="pd-breadcrumbs">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="sep">/</span>
          <span>{product.category}</span>
          <span className="sep">/</span>
          <span className="current">{product.name}</span>
        </div>
      </nav>

      {/* ── Main Layout: Media Gallery + Product Info ── */}
      <section className="pd-layout">
        {/* Left Column: Gallery & Trust Badges */}
        <div className="pd-gallery">
          <div className="pd-main-image-box">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.name} view ${activeImageIndex + 1}`}
              className="pd-main-image"
            />
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  className="pd-gallery-arrow pd-gallery-arrow-left"
                  onClick={() => handleImageChange(-1)}
                  aria-label="Show previous product image"
                >
                  {icon("arrowLeft")}
                </button>
                <button
                  type="button"
                  className="pd-gallery-arrow pd-gallery-arrow-right"
                  onClick={() => handleImageChange(1)}
                  aria-label="Show next product image"
                >
                  {icon("arrowRight")}
                </button>
              </>
            )}
            <span className="pd-badge-pill">{product.badge}</span>
          </div>

          {product.images && product.images.length > 1 && (
            <div
              className="pd-thumbs-strip"
              aria-label="Component gallery thumbnails"
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pd-thumb-btn ${activeImageIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View component image ${idx + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="pd-info">
          <div className="pd-header-meta">
            <span className="pd-category-tag">{product.category}</span>
            <span className="pd-sku-tag">SKU: {product.sku}</span>
          </div>

          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-price-row">
            <div className="pd-current-price">${product.price}</div>
            {product.originalPrice && (
              <>
                <div className="pd-original-price">
                  ${product.originalPrice}
                </div>
                <div className="pd-save-badge">
                  Save ${product.originalPrice - product.price}
                </div>
              </>
            )}
            <div className="pd-stock-status">
              <span className="pd-stock-dot" />
              <span>In Stock ({product.stockCount} Available)</span>
            </div>
          </div>

          <p className="pd-overview">{product.fullDesc}</p>

          {/* Key Bullet Features */}
          {product.features && (
            <ul className="pd-feature-list">
              {product.features.map((feat, idx) => (
                <li className="pd-feature-item" key={idx}>
                  {icon("check")}
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Optional Variants Selector */}
          {product.options && (
            <div className="pd-options-box">
              <span className="pd-options-label">
                Select {product.options.label}:
              </span>
              <div className="pd-options-buttons" role="radiogroup">
                {product.options.values.map((val) => (
                  <button
                    key={val}
                    type="button"
                    role="radio"
                    aria-checked={selectedOption === val}
                    className={`pd-opt-btn ${selectedOption === val ? "active" : ""}`}
                    onClick={() => setSelectedOption(val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Row: Quantity + Add To Cart */}
          <div className="pd-action-box">
            <div className="pd-qty-stepper" aria-label="Quantity selector">
              <button
                type="button"
                className="pd-qty-btn"
                onClick={() => handleQtyChange(-1)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="pd-qty-value">{quantity}</span>
              <button
                type="button"
                className="pd-qty-btn"
                onClick={() => handleQtyChange(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`pd-add-cart-btn ${isAdded ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>{icon("check")} Added to Garage Cart!</>
              ) : (
                <>
                  {icon("cart")} Add To Garage Cart (${product.price * quantity}
                  )
                </>
              )}
            </button>
          </div>

          {/* Paddock perks */}
          <div className="pd-perks-list">
            <div className="pd-perk-item">
              {icon("wrench")}
              <span>
                Includes trackside mounting hardware and technical drawings
              </span>
            </div>
            <div className="pd-perk-item">
              {icon("shield")}
              <span>
                Backed by Pitstop Solutions 30-day competition defect warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Specifications Station ── */}
      <section className="pd-specs-section">
        <div className="pd-tabs-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "specs"}
            className={`pd-tab-trigger ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "compat"}
            className={`pd-tab-trigger ${activeTab === "compat" ? "active" : ""}`}
            onClick={() => setActiveTab("compat")}
          >
            Vehicle & Rulebook Compatibility
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "maintenance"}
            className={`pd-tab-trigger ${activeTab === "maintenance" ? "active" : ""}`}
            onClick={() => setActiveTab("maintenance")}
          >
            Pit Maintenance Guide
          </button>
        </div>

        <div className="pd-tab-content">
          {activeTab === "specs" && (
            <table className="pd-specs-table">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-name">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "compat" && (
            <div className="pd-compat-box">
              <h4>Competition & Rulebook Compliance</h4>
              <p>
                This component is engineered to comply with the technical
                regulations of collegiate and amateur off-road racing series:
              </p>
              <div className="pd-compat-pill">
                Verified Compatible: {product.compatible}
              </div>
              <p>
                All weldments, structural tubing dimensions, and material
                properties meet or exceed SAE BAJA technical inspection
                specifications. Formal Mill Test Reports (MTR) and FEA
                structural load documentation are available upon team request.
              </p>
            </div>
          )}

          {activeTab === "maintenance" && (
            <div className="pd-maintenance-box">
              <h4>Paddock Trackside Maintenance Recommendations</h4>
              <p>
                <strong>Pre-Race Scrutineering:</strong> Check all fasteners
                with a calibrated torque wrench before each heat. Verify zero
                slop in spherical joints and bearing journals.
              </p>
              <p>
                <strong>Post-Heat Inspection:</strong> High-pressure water wash
                to remove abrasive mud slurry. Inspect surface coatings for rock
                chips and re-apply anti-corrosion spray to exposed chromoly and
                steel components.
              </p>
              <p>
                <strong>Replacement Intervals:</strong> Replace consumable wear
                items (belts, seals, brake pads) following 15 hours of severe
                competitive track exposure.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Related / Frequently Paired Hardware ── */}
      {relatedProducts.length > 0 && (
        <section className="pd-related-section">
          <div className="pd-related-header">
            <div>
              <p className="eyebrow">
                <span></span> Complete The Build
              </p>
              <h2>Frequently Paired Components</h2>
            </div>
            <Link to="/shop" className="text-link">
              View Entire Catalog {icon("arrowRight")}
            </Link>
          </div>

          <div className="shop-grid">
            {relatedProducts.map((rel) => (
              <article className="shop-card" key={rel.id}>
                <div className="shop-card-image-wrap">
                  <img src={rel.images[0]} alt={rel.name} loading="lazy" />
                  <span className="shop-card-badge">{rel.badge}</span>
                </div>
                <div className="shop-card-body">
                  <div className="shop-card-meta">
                    <span className="shop-card-cat">{rel.category}</span>
                    <span className="shop-card-sku">{rel.sku}</span>
                  </div>
                  <h3 className="shop-card-title">
                    <Link to={`/product/${rel.id}`}>{rel.name}</Link>
                  </h3>
                  <p className="shop-card-desc">{rel.shortDesc}</p>
                  <div className="shop-card-footer">
                    <div className="shop-card-price-box">
                      <span className="shop-card-price">${rel.price}</span>
                    </div>
                    <Link
                      to={`/product/${rel.id}`}
                      className="shop-card-action-link"
                    >
                      Inspect {icon("arrowRight")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
