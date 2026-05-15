import { useState } from "react";
import { Layout } from "../components/Layout";
import { inquiryCities, inquiryIntents, officeHours, offices } from "../data/contact";
import { usePageEffects } from "../hooks/usePageEffects";
import "../styles/contact.css";

function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    intent: "Buying",
    city: "Islamabad",
  });
  const [sent, setSent] = useState(false);

  usePageEffects();

  const valid = form.name.trim() && form.email.includes("@");
  const ref = `EB-${String(Date.now()).slice(-6)}`;
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!valid) return;
    setSent(true);
  }

  return (
    <Layout active="contact">
      <section className="page-hd">
        <div className="wrap">
          <div className="l">
            <div className="eyebrow">Contact · By referral</div>
            <div className="mono page-note">Reply within 24 hours</div>
          </div>
          <div className="t">
            <h1>
              Begin a <span className="serif-i">private</span> conversation.
            </h1>
            <p>
              EstateBrothers takes a small number of mandates each year. Tell us what you are
              looking for - or what you are quietly considering selling - and one of the brothers
              will respond personally.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-body">
        <div className="wrap">
          <form className="form reveal" onSubmit={submit} noValidate>
            <p className="lead">
              All inquiries are read by Hassan and Bilal directly. We do not use a CRM or call
              centre.
            </p>

            {sent ? (
              <div className="success">
                <div className="h">Thank you, {form.name.split(" ")[0]}.</div>
                <p className="p">
                  Your inquiry has been received. One of the brothers will reach out within one
                  business day from a {form.city} number, between 10:00 and 19:00 PKT.
                </p>
                <span className="ref">Reference · {ref}</span>
              </div>
            ) : (
              <>
                <Field label="I am">
                  <div className="chips">
                    {inquiryIntents.map((intent) => (
                      <button
                        type="button"
                        key={intent}
                        className={`chip${form.intent === intent ? " active" : ""}`}
                        onClick={() => set("intent", intent)}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="City of interest">
                  <div className="chips">
                    {inquiryCities.map((city) => (
                      <button
                        type="button"
                        key={city}
                        className={`chip${form.city === city ? " active" : ""}`}
                        onClick={() => set("city", city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="field-row">
                  <Field label="Name">
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(event) => set("name", event.target.value)}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) => set("email", event.target.value)}
                    />
                  </Field>
                </div>

                <Field label="Phone (optional)">
                  <input
                    type="tel"
                    placeholder="+92 ___ _______"
                    value={form.phone}
                    onChange={(event) => set("phone", event.target.value)}
                  />
                </Field>

                <Field label="Tell us a little">
                  <textarea
                    placeholder="A sector, a price range, an architect, or simply what kind of house you are after."
                    value={form.message}
                    onChange={(event) => set("message", event.target.value)}
                  />
                </Field>

                <div className="submit-row">
                  <button type="submit" className="submit-btn" disabled={!valid}>
                    <span>Send inquiry</span>
                    <span className="arrow">→</span>
                  </button>
                  <span className="submit-note">
                    We respond personally within one business day. Your details are never shared,
                    listed, or marketed to.
                  </span>
                </div>
              </>
            )}
          </form>

          <aside className="aside reveal">
            <div className="aside-block">
              <h3>Speak with us</h3>
              <div className="v">
                Hassan Hashmi <span className="serif-i">&amp;</span> Bilal Hashmi
              </div>
              <div className="meta">
                hello@estatebrothers.pk
                <br />
                +92 51 555 0117
              </div>
            </div>

            <div className="aside-block">
              <h3>Offices</h3>
              <div className="offices">
                {offices.map((office) => (
                  <div className="office" key={office.city}>
                    <div className="city">
                      <span className="dot" />
                      {office.city}
                    </div>
                    <div className="addr">
                      {office.addr.split("\n").map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hours">
              <h3>Hours</h3>
              <table>
                <tbody>
                  {officeHours.map(([day, hours]) => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
