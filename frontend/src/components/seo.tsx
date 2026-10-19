import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  name: string;
  type?: string;
  canonicalUrl: string;
};

export default function SEO({
  title,
  description,
  name,
  type,
  canonicalUrl,
}: SeoProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type || "summary_large_image"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
