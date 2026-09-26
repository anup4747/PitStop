import { Link } from 'react-router-dom'
import './styles/Team.css'

const crewMembers = [
  {
    id: 1,
    name: 'Anup D.',
    callsign: 'APEX-01',
    role: 'Lead Powertrain Engineer',
    department: 'Engine & Dyno Lab',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    bio: 'Pioneers 125cc factory blueprinting, digital CDI ignition mapping, and two-stroke combustion efficiency. Over 6 years of paddock trackside calibration.',
    skills: ['125cc Blueprinting', 'Dyno Tuning', 'Ignition Mapping', 'Apex Flow'],
    email: 'anup@pitstopsolutions.com',
    phone: '+1 (555) 019-2831',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 2,
    name: 'Krushna P.',
    callsign: 'AERO-02',
    role: 'Telemetry & Aero Architect',
    department: 'Data & Aero Simulation',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    bio: 'Designs high-speed wind tunnel airflow simulations and real-time pit-wall telemetry data pipelines to extract hundredths of a second per lap.',
    skills: ['CFD Aerodynamics', 'CAN-Bus Telemetry', 'Track Mapping', 'Real-time Dashboards'],
    email: 'krushna@pitstopsolutions.com',
    phone: '+1 (555) 019-4720',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 3,
    name: 'Elena Vance',
    callsign: 'CHASSIS-03',
    role: 'Chassis & Braking Specialist',
    department: 'Chassis Fabrication',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    bio: 'Specialist in chromoly frame torsion, laser wheel alignment, and twin-piston floating rotor hydraulic calibration for maximum braking response.',
    skills: ['Frame Torsion', 'Castor/Camber Alignment', 'Floating Calipers', 'Axle Flex'],
    email: 'elena@pitstopsolutions.com',
    phone: '+1 (555) 019-5833',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    id: 4,
    name: 'Marcus Ray',
    callsign: 'STRAT-04',
    role: 'Race Operations & Strategy',
    department: 'Paddock Operations',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
    bio: 'Former Rotax Max champion directing paddock dispatch, tire compound temperature management, and race weekend logistics across Europe and America.',
    skills: ['Tire Pyrometry', 'Race Strategy', 'Pit Timing', 'Paddock Logistics'],
    email: 'marcus@pitstopsolutions.com',
    phone: '+1 (555) 019-6944',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
]

function Team() {
  return (
    <div className="team-page">
      {/* Header */}
      <header className="team-header">
        <p className="eyebrow">
          <span></span> Paddock Crew // Engineering & Strategy
        </p>
        <h1>
          Meet The <em>Crew.</em>
        </h1>
        <p>
          The engineers, telemetry analysts, and racers behind Pitstop Solutions. Hover over any member to inspect their bio, track telemetry, and direct contacts.
        </p>
      </header>

      {/* 4-Crew Member Grid */}
      <div className="team-grid">
        {crewMembers.map((member) => (
          <article className="member-card" key={member.id} tabIndex={0}>
            {/* Image Container with Rounded Corners & Raster Effect */}
            <div className="member-image-box">
              <img
                src={member.image}
                alt={member.name}
                className="member-image"
                loading="lazy"
              />

              {/* Raster Pattern Overlay (Active on Hover) */}
              <div className="raster-overlay" aria-hidden="true" />
              <div className="raster-scanline" aria-hidden="true" />
            </div>

            {/* Overlapping Hover Window - Overlaps adjacent members' sections */}
            <div className="member-hover-window">
              <div className="window-header">
                <div>
                  <h3 className="window-name">{member.name}</h3>
                  <p className="window-role">{member.role}</p>
                </div>
                <div className="window-meta-badges">
                  <span className="window-callsign">{member.callsign}</span>
                  <span className="window-dept">{member.department}</span>
                </div>
              </div>

              <div className="window-body">
                <p className="window-bio">{member.bio}</p>

                <div className="window-skills">
                  {member.skills.map((skill, index) => (
                    <span className="window-skill-pill" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="window-contacts">
                  <a
                    href={`mailto:${member.email}`}
                    className="window-contact-item"
                    title="Email Member"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{member.email}</span>
                  </a>

                  <a
                    href={`tel:${member.phone}`}
                    className="window-contact-item"
                    title="Call Line"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{member.phone}</span>
                  </a>

                  <div className="window-social-actions">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="window-social-btn"
                      title="LinkedIn Profile"
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn
                    </a>

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="window-social-btn"
                      title="GitHub / Portfolio"
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Name & Role below image, exactly matching provided design */}
            <div className="member-caption">
              <h2 className="member-title">{member.name}</h2>
              <p className="member-subtitle">{member.role}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Recruitment Banner */}
      <aside className="team-join-banner">
        <div className="join-content">
          <h2>Ready To Join The Paddock?</h2>
          <p>
            We are scouting mechanical engineers, CNC fabricators, and telemetry coders for our 2026 racing calendar.
          </p>
        </div>
        <Link to="/signup" className="join-btn">
          Claim Pit Pass →
        </Link>
      </aside>
    </div>
  )
}

export default Team
