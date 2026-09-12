import { Link, useNavigate, useLocation } from 'react-router-dom'
import logoDark from '../assets/logo.png'
import logoLight from '../assets/logoLight.png'

const icon = (name) => {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
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

function Footer({ theme }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (hash) => {
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer id="journal">
      <div className="footer-brand">
        <Link to="/" className="footer-brand-link" aria-label="Pitstop Solutions home">
          <img
            src={theme === 'light' ? logoLight : logoDark}
            alt="Pitstop Solutions"
            className="footer-logo-img"
          />
        </Link>
        <h2>
          Keep your
        </h2>
        <h2>
          <em>line tight.</em>
        </h2>
        <div className="footer-quick-links">
          <a href="#shop" onClick={(e) => { e.preventDefault(); handleNavClick('#shop'); }}>
            Shop Parts
          </a>
          <span>/</span>
          <a href="#why-us" onClick={(e) => { e.preventDefault(); handleNavClick('#why-us'); }}>
            Why Pitstop
          </a>
          <span>/</span>
          <Link to="/team">Team Members</Link>
          <span>/</span>
          <Link to="/login">Driver Paddock</Link>
          <span>/</span>
          <Link to="/signup">Pit Pass Registration</Link>
        </div>
      </div>

      <div className="footer-newsletter">
        <p className="eyebrow">
          <span></span> The pitstop list
        </p>
        <p>New parts, build notes, and track-day stories. No noise.</p>
        <form onSubmit={(event) => { event.preventDefault(); alert('Subscribed to Pitstop telemetry dispatch!'); }}>
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Your email address"
            required
          />
          <button type="submit" aria-label="Subscribe">
            {icon('arrow')}
          </button>
        </form>
      </div>

      <div className="footer-meta">
        <span>© 2026 Pitstop Solutions • Engineered for Apex Performance</span>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <span>•</span>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <span>•</span>
          <a href="#discord" onClick={(e) => { e.preventDefault(); alert('Discord telemetry server opening soon!'); }}>Discord Paddock</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
