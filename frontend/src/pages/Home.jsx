import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import heroKartImg from "../assets/cart23.jpg";
import { products as catalogProducts, categories as catalogCategories } from "../data/products";

const categories = catalogCategories;
const products = catalogProducts;

const icon = (name) => {
  const paths = {
    cart: (
      <>
        <path d="M3 4h2l2 11h11l2-8H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    play: <path d="m9 6 9 6-9 6V6Z" />,
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

function Home({ search, setSearch, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All parts");

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === "All parts" || product.category === activeCategory;
      const queryMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, search]);

  return (
    <main id="top">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <span></span> Performance parts for serious drivers
          </p>
          <h1>
            Own the
            <br />
            <em>apex.</em>
          </h1>
          <p className="hero-description">
            Everything your kart needs to go faster, stop later, and look the
            part. Proven on track. Shipped to your garage.
          </p>
          <div className="hero-buttons">
            <Link className="button button-red" to="/shop">
              Shop the collection {icon("arrow")}
            </Link>
            <a className="play-link" href="#journal">
              <span>{icon("play")}</span> Watch the pitstop
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="speed-lines" aria-hidden="true"></div>
          <div className="hero-stamp">
            EST. 2018
            <br />
            <b>PS</b>
            <br />
            MOTORSPORT
          </div>
          <img
            src={heroKartImg}
            alt="Go kart racing around a track"
            className="hero-main-img"
          />
          <div className="hero-caption">
            <span>01 / 04</span>
            <b>
              Built for the
              <br />
              racing line
            </b>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
          <span>BUILD</span>
          <i>✦</i>
          <span>RACE</span>
          <i>✦</i>
          <span>REPEAT</span>
          <i>✦</i>
        </div>
      </section>

      {/* Shop Section */}
      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span></span> The parts department
            </p>
            <h2>
              Make your kart
              <br />
              <em>mean business.</em>
            </h2>
          </div>
          <Link className="text-link" to="/shop">
            View all parts {icon("arrow")}
          </Link>
        </div>

        <div className="category-tabs" role="tablist">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "active" : ""}
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.slice(0, 8).map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img
                    src={(product.images && product.images[0]) || product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </Link>
                <span>{product.badge}</span>
                <button
                  type="button"
                  onClick={onAddToCart}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {icon("cart")}
                </button>
              </div>
              <div className="product-info">
                <p>{product.category}</p>
                <h3>
                  <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </h3>
                <strong>${product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Feature Band */}
      <section className="feature-band" id="why-us">
        <div className="feature-band-intro">
          <p className="eyebrow">
            <span></span> Why pitstop
          </p>
          <h2>
            Less wrenching.
            <br />
            <em>More racing.</em>
          </h2>
          <p className="feature-band-lead">
            Every part in our catalog has been track-proven at international
            karting circuits. No knock-offs, no compromises.
          </p>
        </div>
        <div className="feature-list">
          <div>
            <b>01</b>
            <h3>Track-proven</h3>
            <p>We only stock parts we'd trust at the start line.</p>
          </div>
          <div>
            <b>02</b>
            <h3>Fast dispatch</h3>
            <p>Get your build moving with same-day dispatch.</p>
          </div>
          <div>
            <b>03</b>
            <h3>Real advice</h3>
            <p>Talk to racers who know what works and why.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
