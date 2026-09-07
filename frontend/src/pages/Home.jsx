import { useState, useMemo } from 'react'
import heroKartImg from '../assets/cart23.jpg'

const categories = ['All parts', 'Engine', 'Brakes', 'Chassis', 'Safety']

const products = [
  {
    id: 1,
    name: 'Vortex X30 Engine Kit',
    category: 'Engine',
    price: 749,
    badge: 'Race ready',
    desc: 'Factory blueprinted 125cc engine package with digital CDI',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Redline Pro Brake Set',
    category: 'Brakes',
    price: 189,
    badge: 'Best seller',
    desc: 'Laser-ventilated floating rotor with twin-piston calipers',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Apex 30mm Racing Axle',
    category: 'Chassis',
    price: 95,
    badge: 'New drop',
    desc: 'Cold-drawn chromoly steel with medium-stiff flex characteristics',
    image: 'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Pitstop Carbon Helmet',
    category: 'Safety',
    price: 329,
    badge: 'Track tested',
    desc: 'Snell SA2020 homologated ultralight carbon shell',
    image: 'https://images.unsplash.com/photo-1558980664-10ea1a37d7b8?auto=format&fit=crop&w=900&q=85',
  },
]

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
  }
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
  )
}

function Home({ search, setSearch, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All parts')

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = activeCategory === 'All parts' || product.category === activeCategory
      const queryMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [activeCategory, search])

  return (
    <main id="top">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            <span></span> Performance parts for serious drivers
          </p>
          <h1>
            Own the<br />
            <em>apex.</em>
          </h1>
          <p className="hero-description">
            Everything your kart needs to go faster, stop later, and look the part.
            Proven on track. Shipped to your garage.
          </p>
          <div className="hero-buttons">
            <a className="button button-red" href="#shop">
              Shop the collection {icon('arrow')}
            </a>
            <a className="play-link" href="#journal">
              <span>{icon('play')}</span> Watch the pitstop
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="speed-lines" aria-hidden="true"></div>
          <div className="hero-stamp">
            EST. 2018<br />
            <b>PS</b><br />
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
              Built for the<br />
              racing line
            </b>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>RACE</span><i>✦</i>
          <span>BUILD</span><i>✦</i>
          <span>REPEAT</span><i>✦</i>
          <span>RACE</span><i>✦</i>
          <span>BUILD</span><i>✦</i>
          <span>REPEAT</span><i>✦</i>
          <span>RACE</span><i>✦</i>
          <span>BUILD</span><i>✦</i>
          <span>REPEAT</span><i>✦</i>
          <span>RACE</span><i>✦</i>
          <span>BUILD</span><i>✦</i>
          <span>REPEAT</span><i>✦</i>
          <span>RACE</span><i>✦</i>
          <span>BUILD</span><i>✦</i>
          <span>REPEAT</span><i>✦</i>
          <span>RACE</span><i>✦</i>
          <span>BUILD</span><i>✦</i>
          <span>REPEAT</span><i>✦</i>
          <span>RACE</span><i>✦</i>
          <span>BUILD</span>
        </div>
      </section>

      {/* Shop Section */}
      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span></span> The parts department</p>
            <h2>Make your kart<br /><em>mean business.</em></h2>
          </div>
          <button
            className="text-link"
            type="button"
            onClick={() => { setActiveCategory('All parts'); setSearch(''); }}
          >
            View all parts {icon('arrow')}
          </button>
        </div>

        <div className="category-tabs" role="tablist">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'active' : ''}
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
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span>{product.badge}</span>
                <button
                  type="button"
                  onClick={onAddToCart}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {icon('cart')}
                </button>
              </div>
              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <strong>${product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Feature Band */}
      <section className="feature-band" id="why-us">
        <div className="feature-band-intro">
          <p className="eyebrow"><span></span> Why pitstop</p>
          <h2>Less wrenching.<br /><em>More racing.</em></h2>
          <p className="feature-band-lead">
            Every part in our catalog has been track-proven at international karting circuits.
            No knock-offs, no compromises.
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
  )
}

export default Home
