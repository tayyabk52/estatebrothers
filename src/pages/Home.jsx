import { useEffect, useState } from "react";
import { Link } from "react-router";
import heroImage from "../assets/properties/hero-estatebrothers.webp";
import ceoImage from "../assets/team/ceo-tajamal-hussain.jpg";
import { Layout } from "../components/Layout";
import { PartnersCarousel } from "../components/PartnersCarousel";
import { featuredProperties, heroStats, stats, testimonials } from "../data/listings";
import { usePageEffects } from "../hooks/usePageEffects";
import "../styles/home.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-stage">
        <div className="hero-img" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-content">
          <div className="eyebrow-w">
            <span>Pakistan · Real estate and investment services</span>
          </div>
          <h1>
            Land, light, <span className="serif-i">and</span>
            <br />
            the houses
            <br />
            worth waiting for.
          </h1>
          <div className="hero-side">
            <p className="lede">
              Estate Brothers helps clients buy, sell, and invest with confidence through trusted
              guidance, secure opportunities, and a professional team available around the clock.
            </p>
            <Link to="/buy-sell" className="hero-primary-link">
              View Listings
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-listings-strip">
        <div>
          <span className="eyebrow">Buy / Sell</span>
          <strong>View our listings</strong>
        </div>
        <Link to="/buy-sell">Open inventory</Link>
      </div>

      <div className="hero-strip">
        {heroStats.map((stat) => (
          <div className="cell" key={stat.l}>
            <div className="n">
              {stat.n}
              {stat.unit && <span className="unit">{stat.unit}</span>}
            </div>
            <div className="l">{stat.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


function PropertyRow({ property }) {
  return (
    <article className="property reveal" id={`p-${property.id}`}>
      <span className="idx">№ {property.id}</span>
      <div className="img">
        <img src={property.image} alt={`${property.name} exterior`} loading="lazy" />
        <span className="ph">{property.photoNote}</span>
      </div>
      <div className="info">
        <span className="place">{property.place}</span>
        <h3 className="name">{property.name}</h3>
        <p className="desc">{property.desc}</p>
        <span className="mono property-arch">{property.arch}</span>
      </div>
      <div className="specs">
        <div className="price">{property.priceLabel}</div>
        <div className="row">
          <span>Plot</span>
          <span>{property.plot}</span>
        </div>
        <div className="row">
          <span>Covered</span>
          <span>{property.covered.toLocaleString()} sf</span>
        </div>
        <div className="row">
          <span>Bed</span>
          <span>{property.beds}</span>
        </div>
        <div className="row">
          <span>Bath</span>
          <span>{property.baths}</span>
        </div>
      </div>
      <span className={`tag tag-${property.tag}`}>{property.status}</span>
      <span className="arrow">→</span>
    </article>
  );
}

function Featured() {
  return (
    <section className="section" id="listings">
      <div className="wrap">
        <header className="section-hd reveal">
          <div className="label">
            <div className="eyebrow">Currently representing</div>
            <div className="mono section-date">Updated · Mar 14, 2026</div>
          </div>
          <div className="title">
            <h2>
              Four residences,
              <br />
              each one <span className="serif-i">walked</span> twice.
            </h2>
          </div>
          <div className="aux">
            <Link to="/buy-sell">View Buy/Sell →</Link>
          </div>
        </header>
        <div className="property-list">
          {featuredProperties.map((property) => (
            <PropertyRow key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Narrative() {
  return (
    <section className="narrative" id="about">
      <div className="wrap">
        <div className="col-l reveal">
          <div className="img">
            <img src={ceoImage} alt="Tajamal Hussain, Chief Executive Officer of Estate Brothers" loading="lazy" />
            <span className="ph">CEO - Tajamal Hussain, Estate Brothers</span>
          </div>
        </div>
        <div className="col-r reveal">
          <div className="eyebrow">Leadership · 10+ years of experience</div>
          <h2>
            Built on trust, expertise, and results.{" "}
            <span className="serif-i">Led by Tajamal Hussain.</span>
          </h2>
          <p>
            With over a decade of hands-on experience in real estate, Tajamal Hussain has built a
            strong reputation for integrity, market knowledge, and client-focused service. Estate
            Brothers helps clients make confident property decisions through transparent guidance
            and trusted opportunities.
          </p>
          <p className="narrative-meta">
            From a single vision to a growing real estate network, Estate Brothers now operates
            from 44-A Main DHA Office Phase 6 Lahore with 4 branches, 30+ professional team members,
            and support available 24/7.
          </p>
          <div className="signature">
            <div className="avatars">
              <div className="avatar avatar-one" />
              <div className="avatar avatar-two" />
            </div>
            <div className="who">
              <span className="name">Tajamal Hussain</span>
              <span className="role">Chief Executive Officer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="testimonial">
      <div className="wrap">
        <div className="nums">
          {testimonials.map((item, itemIndex) => (
            <button
              type="button"
              key={item.name}
              className={`num-btn${itemIndex === index ? " active" : ""}`}
              onClick={() => setIndex(itemIndex)}
            >
              <span className="marker">{itemIndex === index ? "●" : "○"}</span> 0{itemIndex + 1}
            </button>
          ))}
        </div>
        <div className="quote reveal">
          <blockquote key={index}>
            <span className="mark">“</span>
            {testimonial.quote}
          </blockquote>
          <div className="attr">
            <div className="av" />
            <div className="who">
              <span className="name">{testimonial.name}</span>
              <span className="role">{testimonial.role}</span>
            </div>
          </div>
        </div>
        <div className="stats reveal">
          {stats.map((stat) => (
            <div className="stat" key={stat.l}>
              <div className="n">
                {stat.n}
                {stat.unit && <span className="unit">{stat.unit}</span>}
              </div>
              <div className="l">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  usePageEffects();

  return (
    <Layout active="home">
      <Hero />
      <PartnersCarousel />
      <Featured />
      <Narrative />
      <Testimonial />
    </Layout>
  );
}
