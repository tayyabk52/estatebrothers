import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="footer" id="contact-footer">
      <div className="wrap footer-simple">
        <div className="footer-brand">
          <div className="mark">
            Estate<span className="amp">&amp;</span>Brothers
          </div>
          <p>Trusted real estate partners for buying, selling, and secure investments.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/buy-sell">Buy/Sell</Link>
          <Link to="/about">About</Link>
          <Link to="/updates">Updates</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-contact">
          <span>44-A Main DHA Office Phase 6, Lahore</span>
          <a href="tel:+923252222330">0325 2222330</a>
          <a href="mailto:estatebrothers786@gmail.com">estatebrothers786@gmail.com</a>
        </div>

        <div className="footer-bot">
          <span>© 2026 Estate Brothers</span>
          <span>Real estate and investment services</span>
        </div>
      </div>
    </footer>
  );
}
