import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

const links = [
  { to: "/", label: "Home", key: "home", n: "" },
  { to: "/buy-sell", label: "Buy/Sell", key: "buy-sell", n: "08" },
  { to: "/about", label: "About", key: "about", n: "10+" },
  { to: "/#journal", label: "Updates", key: "journal", n: "-" },
  { to: "/contact", label: "Contact", key: "contact", n: "" },
];

function isActiveLink(active, key) {
  return active === key;
}

function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <svg viewBox="0 0 430 116" role="img" focusable="false">
        <g className="brand-logo-mark">
          <path d="M26 57c24-2 31-24 48-40" />
          <path d="M42 71c20-3 29-19 42-34" />
          <path d="M118 17c17 16 24 38 48 40" />
          <path d="M108 37c13 15 22 31 42 34" />
          <path d="M31 84c31-5 44-15 61-29" />
          <path d="M145 84c-31-5-44-15-61-29" />
          <circle cx="88" cy="54" r="35" />
          <path d="M66 30c5-8 12-13 22-13s17 5 22 13" />
          <path d="M67 79c5 8 12 12 21 12s16-4 21-12" />
          {Array.from({ length: 11 }).map((_, index) => {
            const angle = (-70 + index * 14) * (Math.PI / 180);
            return (
              <circle
                key={index}
                cx={88 + Math.cos(angle) * 45}
                cy={54 + Math.sin(angle) * 45}
                r="2.7"
              />
            );
          })}
          <text x="88" y="67" textAnchor="middle">
            EB
          </text>
        </g>
        <g className="brand-logo-type">
          <text x="184" y="54" className="brand-logo-name">
            Estate Brothers
          </text>
          <text x="186" y="83" className="brand-logo-tagline">
            Reliable real estate solutions
          </text>
        </g>
      </svg>
    </span>
  );
}

export function Nav({ active = "buy-sell" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label="Estate Brothers home">
            <BrandLogo />
          </Link>

          <div className="nav-links">
            {links.slice(0, 4).map((link) => (
              <NavLink
                key={link.key}
                to={link.to}
                className={isActiveLink(active, link.key) ? "active" : ""}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-right">
            <Link to="/contact" className="nav-btn">
              <span>Contact Us</span>
              <span className="arrow">→</span>
            </Link>
            <button
              type="button"
              className={`nav-burger${open ? " open" : ""}`}
              aria-label="Menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-menu${open ? " open" : ""}`}>
        <div className="nav-menu-hd">
          <Link
            to="/"
            className="nav-brand nav-brand-menu"
            aria-label="Estate Brothers home"
            onClick={() => setOpen(false)}
          >
            <BrandLogo />
          </Link>
          <button
            type="button"
            className="nav-burger open"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>

        <div className="nav-menu-links">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className={isActiveLink(active, link.key) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <span>{link.label}</span>
              {link.n && <span className="n">{link.n}</span>}
            </Link>
          ))}
        </div>

        <div className="nav-menu-foot">
          <span>Estate Brothers · DHA Phase 6 Lahore · 4 branches</span>
          <Link to="/contact" className="cta" onClick={() => setOpen(false)}>
            Contact Us →
          </Link>
        </div>
      </div>
    </>
  );
}
