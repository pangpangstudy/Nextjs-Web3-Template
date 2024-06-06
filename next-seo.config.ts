import { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  titleTemplate: "%s | You App Name",
  defaultTitle: "You App Title",
  description: "You App description",
  twitter: {
    cardType: "summary_large_image",
    handle: "@YourAppTwitterHandle",
    site: "@YourAppTwitterHandle",
  },
  openGraph: {
    title: "Your App Title - The Best Place for Your Needs",
    description: "Discover amazing features and services on our platform",
    images: [{ url: "https://yourapp.com/default-image.jpg" }],
  },
};
