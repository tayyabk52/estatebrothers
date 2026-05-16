import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import headerLogo from "../assets/brand/headerlogo.svg";

const links = [
  { to: "/", label: "Home", key: "home", n: "" },
  { to: "/buy-sell", label: "Buy/Sell", key: "buy-sell", n: "08" },
  { to: "/about", label: "About", key: "about", n: "10+" },
  { to: "/updates", label: "Updates", key: "updates", n: "" },
  { to: "/contact", label: "Contact", key: "contact", n: "" },
];

function isActiveLink(active, key) {
  return active === key;
}

function BrandLogo() {
  return (
    <span className="brand-logo">
      <img src={headerLogo} alt="Estate Brothers" />
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
