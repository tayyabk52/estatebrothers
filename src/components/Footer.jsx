import { Link } from "react-router";

const footerColumns = [
  {
    h: "Residences",
    items: [
      ["Currently listed", "04", "/#listings"],
      ["Recently transferred", "41", "/archive"],
      ["Off-market mandates", "18", "/contact"],
      ["The archive", "∞", "/archive"],
    ],
  },
  {
    h: "Practice",
    items: [
      ["About Estate Brothers", "", "/#about"],
      ["Investment services", "", "/contact"],
      ["The journal", "", "/#journal"],
      ["Press & recognition", "", "/#"],
    ],
  },
  {
    h: "Contact",
    items: [
      ["Private inquiry", "", "/contact"],
      ["DHA Phase 6 Lahore", "", "/contact"],
      ["Always open", "", "/contact"],
      ["estatebrothers1", "", "/contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer" id="contact-footer">
      <div className="wrap">
        <div className="col-brand">
          <div className="mark">
            Estate<span className="amp">&amp;</span>Brothers
          </div>
          <p>
            Trusted real estate partners delivering secure investments, smart opportunities, and
            property decisions built with confidence.
          </p>
          <div className="addr">
            Top Floor 44-A Main DHA Office Phase 6
            <br />
            Lahore, Pakistan, 54000
            <br />
            <br />
            0325 2222330
            <br />
            estatebrothers786@gmail.com
          </div>
        </div>

        {footerColumns.map((column, index) => (
          <div key={column.h} className={`col-list ${["col-a", "col-b", "col-c"][index]}`}>
            <h4>{column.h}</h4>
            {column.items.map(([text, number, href]) => (
              <Link to={href} key={text}>
                <span>{text}</span>
                {number && <span className="n">{number}</span>}
              </Link>
            ))}
          </div>
        ))}

        <div className="footer-bot">
          <span>© 2026 Estate Brothers · Real estate and investment services</span>
          <span>Set in Inter Tight &amp; Inter</span>
        </div>
      </div>
    </footer>
  );
}
