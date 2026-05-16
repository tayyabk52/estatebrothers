import { useEffect } from "react";

function upsertMeta(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertProperty(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function useSeo({ title, description, canonicalPath }) {
  useEffect(() => {
    document.title = title;
    upsertMeta("description", description);
    upsertProperty("og:title", title);
    upsertProperty("og:description", description);
    upsertProperty("og:type", "website");

    const canonicalUrl = `${window.location.origin}${canonicalPath}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [canonicalPath, description, title]);
}
