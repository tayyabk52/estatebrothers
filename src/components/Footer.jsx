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
      ["About the brothers", "", "/#about"],
      ["Advisory & valuation", "", "/contact"],
      ["The journal", "", "/#journal"],
      ["Press & recognition", "", "/#"],
    ],
  },
  {
    h: "Contact",
    items: [
      ["Private inquiry", "", "/contact"],
      ["Islamabad - F-7", "", "/contact"],
      ["Lahore - Gulberg V", "", "/contact"],
      ["Karachi - Bath Island", "", "/contact"],
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
            Architecturally considered residences across Karachi, Lahore, and Islamabad -
            represented by two brothers.
          </p>
          <div className="addr">
            12 Khayaban-e-Iqbal, F-7 Markaz
            <br />
            Islamabad, 44000
            <br />
            <br />
            +92 51 555 0117
            <br />
            hello@estatebrothers.pk
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
          <span>© 2026 EstateBrothers (Pvt.) Ltd · Licensed in Pakistan</span>
          <span>Set in Inter Tight &amp; Inter</span>
        </div>
      </div>
    </footer>
  );
}
