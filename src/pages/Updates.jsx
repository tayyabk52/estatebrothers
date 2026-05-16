import { useMemo, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { formatUpdateDate, updates, updateTypes } from "../data/updates";
import { usePageEffects } from "../hooks/usePageEffects";
import { useSeo } from "../hooks/useSeo";
import "../styles/updates.css";

function UpdateTypeTabs({ activeType, setActiveType }) {
  return (
    <div className="updates-tabs" aria-label="Update categories">
      {updateTypes.map((type) => (
        <button
          key={type.id}
          type="button"
          className={activeType === type.id ? "active" : ""}
          onClick={() => setActiveType(type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}

function UpdateLink({ link }) {
  const isExternal = link.kind === "external";
  const content = (
    <>
      <span>{link.label}</span>
      {isExternal ? (
        <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
      ) : (
        <FileText size={13} strokeWidth={2} aria-hidden="true" />
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={link.url} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <Link to={link.url}>{content}</Link>;
}

function FeaturedUpdate({ update }) {
  return (
    <article className="updates-feature reveal">
      <div className="updates-feature-copy">
        <div className="updates-meta">
          <span>{updateTypes.find((type) => type.id === update.type)?.label}</span>
          <time dateTime={update.publishedAt}>{formatUpdateDate(update.publishedAt)}</time>
        </div>
        <h2>{update.title}</h2>
        <p>{update.summary}</p>
        <div className="updates-actions">
          {update.externalLinks.map((link) => (
            <UpdateLink key={link.label} link={link} />
          ))}
        </div>
      </div>
      <div className="updates-feature-media">
        <img src={update.media.url} alt={update.media.alt} loading="eager" />
      </div>
    </article>
  );
}

function UpdateCard({ update }) {
  return (
    <article className="update-card reveal">
      <div className="update-thumb">
        <img src={update.media.url} alt={update.media.alt} loading="lazy" />
      </div>
      <div className="update-content">
        <header>
          <div className="updates-meta">
            <span>{updateTypes.find((type) => type.id === update.type)?.label}</span>
            <time dateTime={update.publishedAt}>{formatUpdateDate(update.publishedAt)}</time>
          </div>
          <h2>{update.title}</h2>
        </header>
        <p>{update.summary}</p>
        <div className="update-tags" aria-label="Tags">
          {update.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <footer>
          <span className="mono">Updated {formatUpdateDate(update.updatedAt)}</span>
          <div className="updates-actions">
            {update.externalLinks.map((link) => (
              <UpdateLink key={link.label} link={link} />
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}

export function Updates() {
  const [activeType, setActiveType] = useState("all");
  const featured = updates.find((update) => update.featured);
  const listedUpdates = useMemo(
    () =>
      updates.filter((update) => {
        if (update.status !== "published" || update.visibility !== "public") return false;
        if (activeType === "all") return true;
        return update.type === activeType;
      }),
    [activeType],
  );

  usePageEffects();
  useSeo({
    title: "Updates | Estate Brothers",
    description:
      "Latest Estate Brothers announcements, Facebook posts, MOU activity, market notes, and property updates.",
    canonicalPath: "/updates",
  });

  return (
    <Layout active="updates">
      <main>
        <section className="updates-hero">
          <div className="wrap">
            <div className="updates-hero-copy reveal">
              <div className="eyebrow">Updates</div>
              <h1>
                Announcements, posts, and market notes in <span className="serif-i">one feed.</span>
              </h1>
              <p>
                A clean public record for Estate Brothers news, Facebook activity, MOU posts,
                property announcements, and client-facing updates.
              </p>
            </div>
            <div className="updates-hero-note reveal">
              <span className="mono">Published feed</span>
              <strong>{updates.length}</strong>
              <span>demo updates</span>
            </div>
          </div>
        </section>

        <section className="updates-body">
          <div className="wrap">
            <UpdateTypeTabs activeType={activeType} setActiveType={setActiveType} />
            {featured && activeType === "all" && <FeaturedUpdate update={featured} />}

            <div className="updates-list-head">
              <div>
                <h2>Latest updates</h2>
                <p>Structured for future admin publishing with media, links, tags, and attachments.</p>
              </div>
              <span className="mono">{listedUpdates.length} shown</span>
            </div>

            <div className="updates-list">
              {listedUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
