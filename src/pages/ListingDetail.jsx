import { useState } from "react";
import { Link, useParams } from "react-router";
import { Layout } from "../components/Layout";
import { getAgent, getListingBySlug } from "../data/inventory";
import { usePageEffects } from "../hooks/usePageEffects";
import "../styles/buySell.css";

function DetailList({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="detail-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function HouseDetail({ listing, agent }) {
  const [activeImage, setActiveImage] = useState(0);
  const activeGalleryImage = listing.gallery[activeImage] || listing.gallery[0];

  return (
    <>
      <section className="detail-gallery">
        <div className="wrap">
          <div className="gallery-mobile">
            <div className="gallery-mobile-main">
              <img src={activeGalleryImage} alt={`${listing.title} selected view`} />
            </div>
            <div className="gallery-thumbs" aria-label="Listing image thumbnails">
              {listing.gallery.map((image, index) => (
                <button
                  key={`${listing.id}-thumb-${index}`}
                  type="button"
                  className={activeImage === index ? "active" : ""}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {listing.gallery.map((image, index) => (
              <div className="gallery-image" key={`${listing.id}-${index}`}>
                <img src={image} alt={`${listing.title} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-body">
        <div className="wrap">
          <div className="detail-main">
            <ContactPanel agent={agent} listing={listing} compact />

            <div className="detail-summary-table">
              <table>
                <tbody>
                  <tr><th>Size</th><td>{listing.size}</td><th>Bedrooms</th><td>{listing.bedrooms}</td></tr>
                  <tr><th>Bathrooms</th><td>{listing.bathrooms}</td><th>Garage</th><td>{listing.specs.garageCapacity} car</td></tr>
                  <tr><th>Phase</th><td>{listing.phase}</td><th>City</th><td>{listing.city}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="detail-block">
              <h2>Location details</h2>
              <dl className="detail-specs">
                <div><dt>Address</dt><dd>{listing.location.address}</dd></div>
                <div><dt>Neighborhood</dt><dd>{listing.location.neighborhood}</dd></div>
                <div><dt>City</dt><dd>{listing.location.city}</dd></div>
                <div><dt>Postal code</dt><dd>{listing.location.postalCode}</dd></div>
              </dl>
            </div>

            <div className="detail-feature-grid">
              <DetailList title="Interior" items={listing.features.interior} />
              <DetailList title="Exterior" items={listing.features.exterior} />
              <DetailList title="Tags" items={listing.features.tags} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PlotDetail({ listing, agent }) {
  return (
    <section className="detail-body">
      <div className="wrap">
        <div className="detail-main">
          <ContactPanel agent={agent} listing={listing} compact />

          <div className="detail-summary-table">
            <table>
              <tbody>
                <tr><th>Phase</th><td>{listing.phase}</td><th>Size</th><td>{listing.size}</td></tr>
                <tr><th>Project</th><td>{listing.project}</td><th>Status</th><td>{listing.status}</td></tr>
                <tr><th>Block</th><td>{listing.block}</td><th>Updated</th><td>{listing.updatedAt}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="detail-block">
            <h2>Plot details</h2>
            <dl className="detail-specs compact">
              <div><dt>Phase</dt><dd>{listing.phase}</dd></div>
              <div><dt>Project</dt><dd>{listing.project}</dd></div>
              <div><dt>Block</dt><dd>{listing.block}</dd></div>
              <div><dt>Size</dt><dd>{listing.size}</dd></div>
              <div><dt>Status</dt><dd>{listing.status}</dd></div>
              <div><dt>Updated</dt><dd>{listing.updatedAt}</dd></div>
            </dl>
          </div>
          <div className="detail-block">
            <h2>Notes</h2>
            <p>{listing.notes}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPanel({ agent, listing, compact = false }) {
  return (
    <aside className={`detail-contact${compact ? " detail-contact-top" : ""}`}>
      <div className="detail-contact-id">
        <span className="eyebrow">Contact person</span>
        <h3>{agent.name}</h3>
        <p>{agent.role}</p>
      </div>
      <div className="detail-contact-actions">
        <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>{agent.phone}</a>
        <a href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a>
        <a href={`mailto:${agent.email}`}>Email</a>
      </div>
      <span className="mono detail-listing-id">{listing.id}</span>
    </aside>
  );
}

export function ListingDetail() {
  const { listingType, slug } = useParams();
  const listing = getListingBySlug(listingType, slug);

  usePageEffects();

  if (!listing) {
    return (
      <Layout active="buy-sell">
        <main className="detail-not-found">
          <div className="wrap">
            <h1>Listing not found.</h1>
            <Link to="/buy-sell">Back to Buy/Sell</Link>
          </div>
        </main>
      </Layout>
    );
  }

  const agent = getAgent(listing.contactPersonId);

  return (
    <Layout active="buy-sell">
      <main>
        <section className="detail-hero">
          <div className="wrap">
            <Link to="/buy-sell" className="detail-back">Back to Buy/Sell</Link>
            <div className="detail-title">
              <div className="eyebrow">{listing.type === "plot" ? "Plot for sale" : "House for sale"}</div>
              <h1>{listing.type === "plot" ? `${listing.phase} ${listing.size} Plot` : listing.title}</h1>
              <p>{listing.type === "plot" ? listing.notes : `${listing.phase}, ${listing.city}`}</p>
            </div>
            <div className="detail-price">
              <span>{listing.status}</span>
              <strong>{listing.price}</strong>
            </div>
          </div>
        </section>

        {listing.type === "house" ? (
          <HouseDetail listing={listing} agent={agent} />
        ) : (
          <PlotDetail listing={listing} agent={agent} />
        )}
      </main>
    </Layout>
  );
}
