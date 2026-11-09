
export const SITE_URL = (
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000"
      ).replace(/\/$/, "");

export const SITE_NAME = "Quickbook";

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/opengraph-image.jpg",
  noIndex = false,
}) {
  const canonicalPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalPath,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type: "website",
      images: image ? [image] : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}