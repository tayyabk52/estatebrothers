import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { archiveProperties } from "../data/archive";
import { usePageEffects } from "../hooks/usePageEffects";
import "../styles/archive.css";

function ArchiveItem({ property }) {
  return (
    <div className="item">
      <div className="name">{property.name}</div>
      <div className="place">{property.place}</div>
      <div className="specs">
        {property.plot} · {property.covered.toLocaleString()} sf
      </div>
      <div className="price">{property.price}</div>
    </div>
  );
}

function YearGroup({ year, items }) {
  return (
    <section className="year-group reveal">
      <div className="wrap">
        <div className="year-row">
          <div className="y">
            {year}
            <span className="count">
              {items.length} mandate{items.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="list">
            {items.map((property, index) => (
              <ArchiveItem key={`${year}-${index}`} property={property} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Archive() {
  const [city, setCity] = useState("All");
  const [year, setYear] = useState("All");

  usePageEffects();

  const cities = ["All", "Islamabad", "Lahore", "Karachi"];
  const years = ["All", "2025", "2024", "2023", "2022", "2021"];

  const filtered = useMemo(
    () =>
      archiveProperties.filter(
        (property) =>
          (city === "All" || property.city === city) &&
          (year === "All" || String(property.y) === year),
      ),
    [city, year],
  );

  const grouped = useMemo(() => {
    const groups = new Map();
    filtered.forEach((property) => {
      if (!groups.has(property.y)) groups.set(property.y, []);
      groups.get(property.y).push(property);
    });
    return [...groups.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <Layout active="archive">
      <section className="page-hd">
        <div className="wrap">
          <div className="l">
            <div className="eyebrow">The Archive · 2021 - 2025</div>
            <div className="mono page-note">Updated Mar 14, 2026</div>
          </div>
          <div className="t">
            <h1>
              Every house we have <span className="serif-i">quietly</span> handed over.
            </h1>
            <p>
              EstateBrothers represents fewer than thirty mandates each year. What follows is the
              complete record of residences we have transferred since 2021 - across Islamabad,
              Lahore, and Karachi.
            </p>
          </div>
          <div className="meta">
            <div className="n">{archiveProperties.length}</div>
            <div className="l">Total mandates</div>
          </div>
        </div>
      </section>

      <section className="filters">
        <div className="wrap">
          <div className="filter-group">
            {cities.map((value) => (
              <button
                key={value}
                type="button"
                className={`filter-chip${city === value ? " active" : ""}`}
                onClick={() => setCity(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="filter-group">
            {years.map((value) => (
              <button
                key={value}
                type="button"
                className={`filter-chip${year === value ? " active" : ""}`}
                onClick={() => setYear(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="filter-meta">
            {filtered.length} of {archiveProperties.length} shown
          </div>
        </div>
      </section>

      {grouped.map(([groupYear, items]) => (
        <YearGroup key={groupYear} year={groupYear} items={items} />
      ))}

      {grouped.length === 0 && (
        <section className="empty-state">
          <div className="wrap">
            <div className="serif-i">No mandates match.</div>
            <p>Try another city or year.</p>
          </div>
        </section>
      )}

      <section className="end-cta">
        <div className="wrap">
          <div className="l">
            <h2>
              Looking for something <span className="serif-i">specific</span>?
            </h2>
            <p>
              Many of our mandates never reach the public listing. If you are searching for a
              particular sector, plot size, or architect, we may already know the right house.
            </p>
          </div>
          <div className="r">
            <Link to="/contact" className="btn">
              <span>Begin a private inquiry</span>
              <span>→</span>
            </Link>
            <span className="note">Response within 24 hours · PKT business hours</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
