import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './Shop.css'

const icon = (name) => {
  const paths = {
    cart: (
      <>
        <path d="M3 4h2l2 11h11l2-8H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
    check: (
      <path d="M20 6 9 17l-5-5" />
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18M6 6l12 12" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    wrench: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    )
  }
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
  )
}

function Shop({ onAddToCart, search, setSearch, categories, products }) {
  const [activeCategory, setActiveCategory] = useState('All Parts')
  const [sortBy, setSortBy] = useState('featured')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [addedIds, setAddedIds] = useState({})

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { 'All Parts': products.length }
    categories.forEach((cat) => {
      if (cat !== 'All Parts') {
        counts[cat] = products.filter((p) => p.category === cat).length
      }
    })
    return counts
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory =
        activeCategory === 'All Parts' || product.category === activeCategory
      const query = (search || '').toLowerCase().trim()
      const matchSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.shortDesc.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      const matchStock = !onlyInStock || product.inStock

      return matchCategory && matchSearch && matchStock
    })

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [activeCategory, search, onlyInStock, sortBy])

  const handleQuickAdd = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart()
    setAddedIds((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }))
    }, 1200)
  }

  const handleResetFilters = () => {
    setActiveCategory('All Parts')
    if (setSearch) setSearch('')
    setOnlyInStock(false)
    setSortBy('featured')
  }

  return (
    <div className="shop-page">
      {/* ── Shop Hero ── */}
      <section className="shop-hero">
        <nav className="shop-breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="current">Parts Paddock</span>
        </nav>

        <div className="shop-hero-content">
          <div className="shop-hero-text">
            <p className="eyebrow">
              <span></span> Racing Hardware & Components
            </p>
            <h1>
              Parts <em>Department.</em>
            </h1>
            <p className="lead">
              Precision-machined powertrain, chassis, suspension, braking, and control components
              homologated for competitive SAE BAJA, Formula Student, and high-performance racing builds.
            </p>
          </div>

          <div className="shop-hero-stats">
            <div className="shop-stat-box">
              <div className="shop-stat-num">{products.length}</div>
              <div className="shop-stat-label">Race Homologated</div>
            </div>
            <div className="shop-stat-box">
              <div className="shop-stat-num">4</div>
              <div className="shop-stat-label">Core Divisions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter & Search Toolbar ── */}
      <section className="shop-toolbar">
        {/* Top Row: Category Tabs */}
        <div className="shop-toolbar-top">
          <div className="shop-cat-tabs" role="tablist" aria-label="Component Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`shop-cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
                <span className="shop-cat-count">{categoryCounts[cat] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row: Search & Refinements */}
        <div className="shop-toolbar-bottom">
          <div className="shop-search-wrapper">
            <span className="shop-search-icon">{icon('search')}</span>
            <input
              type="text"
              className="shop-search-input"
              placeholder="Search by part name, SKU, or keyword..."
              value={search || ''}
              onChange={(e) => setSearch && setSearch(e.target.value)}
              aria-label="Search catalog"
            />
            {search && (
              <button
                type="button"
                className="shop-search-clear"
                onClick={() => setSearch && setSearch('')}
                aria-label="Clear search"
              >
                {icon('close')}
              </button>
            )}
          </div>

          <div className="shop-filter-controls">
            <label className="shop-stock-toggle">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <span>In Stock Only</span>
            </label>

            <div className="shop-sort-select-wrapper">
              <label htmlFor="shop-sort">Sort:</label>
              <select
                id="shop-sort"
                className="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Paddock</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Active Filter Badges ── */}
      {(activeCategory !== 'All Parts' || search || onlyInStock) && (
        <div className="shop-active-filters">
          <span>Active Filters:</span>
          {activeCategory !== 'All Parts' && (
            <span className="shop-filter-tag">
              Category: {activeCategory}
              <button type="button" onClick={() => setActiveCategory('All Parts')}>
                ×
              </button>
            </span>
          )}
          {search && (
            <span className="shop-filter-tag">
              Search: "{search}"
              <button type="button" onClick={() => setSearch && setSearch('')}>
                ×
              </button>
            </span>
          )}
          {onlyInStock && (
            <span className="shop-filter-tag">
              In Stock Only
              <button type="button" onClick={() => setOnlyInStock(false)}>
                ×
              </button>
            </span>
          )}
          <button type="button" className="shop-reset-all" onClick={handleResetFilters}>
            Reset All
          </button>
        </div>
      )}

      {/* ── Product Catalog Grid ── */}
      <main className="shop-catalog">
        <div className="shop-results-meta">
          <span>
            Showing <b>{filteredProducts.length}</b> of {products.length} components
          </span>
          {activeCategory !== 'All Parts' && <span>Division: {activeCategory}</span>}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="shop-empty-state">
            <h3>No Racing Components Found</h3>
            <p>We couldn't find any parts matching your specific filter criteria.</p>
            <button type="button" className="button button-red" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => {
              const isAdded = addedIds[product.id]
              const specKeys = Object.keys(product.specs || {})
              const firstTwoSpecs = specKeys.slice(0, 2)

              return (
                <article className="shop-card" key={product.id}>
                  <div className="shop-card-image-wrap">
                    <img src={product.images[0]} alt={product.name} loading="lazy" />
                    <span className="shop-card-badge">{product.badge}</span>
                    <div className="shop-card-stock-dot">
                      <span className="stock-indicator" />
                      <span>{product.stockCount} in paddock</span>
                    </div>
                    <button
                      type="button"
                      className="shop-quick-cart"
                      onClick={(e) => handleQuickAdd(e, product)}
                      aria-label={`Add ${product.name} to cart`}
                      title="Quick Add to Cart"
                    >
                      {isAdded ? icon('check') : icon('cart')}
                    </button>
                  </div>

                  <div className="shop-card-body">
                    <div className="shop-card-meta">
                      <span className="shop-card-cat">{product.category}</span>
                      <span className="shop-card-sku">{product.sku}</span>
                    </div>

                    <h3 className="shop-card-title">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>

                    <p className="shop-card-desc">{product.shortDesc}</p>

                    {firstTwoSpecs.length > 0 && (
                      <div className="shop-card-specs-pill">
                        {firstTwoSpecs.map((key) => (
                          <span className="shop-spec-badge" key={key}>
                            {key}: {product.specs[key].split('(')[0].trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="shop-card-footer">
                      <div className="shop-card-price-box">
                        <span className="shop-card-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="shop-card-original-price">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/product/${product.id}`}
                        className="shop-card-action-link"
                      >
                        Inspect {icon('arrowRight')}
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* ── Technical Consultation Banner ── */}
        <aside className="shop-paddock-banner">
          <div className="shop-banner-info">
            <p className="eyebrow">
              <span></span> Custom Machining & Dyno Tuning
            </p>
            <h3>Need Custom Tolerances or Rulebook Clearance?</h3>
            <p>
              Our Lead Powertrain and Chassis Engineers offer custom tube bending, gear profiling,
              and dyno calibration for collegiate teams and privateer racers.
            </p>
          </div>
          <Link to="/team" className="shop-banner-btn">
            Consult Dyno Lab {icon('arrowRight')}
          </Link>
        </aside>
      </main>
    </div>
  )
}

export default Shop
