import { site } from "@/data/site";

/** schema.org Person markup for search engines. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    worksFor: { "@type": "Organization", name: site.company },
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
    url: site.url,
    sameAs: Object.values(site.socials),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from static site data only; "<" is escaped so it can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
