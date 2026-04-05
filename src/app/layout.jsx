import "./globals.css";

export const metadata = {
  title: "Akaaljot Singh Mathoda — Portfolio",
  description:
    "Full-stack developer & AI enthusiast. Building at the intersection of AI and software engineering. SFU Computing Science.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.png",
  },
  keywords: [
    "Akaaljot Singh Mathoda",
    "portfolio",
    "full-stack developer",
    "AI",
    "SFU",
    "React",
    "Next.js",
    "Python",
    "Java",
  ],
  authors: [{ name: "Akaaljot Singh Mathoda" }],
  openGraph: {
    title: "Akaaljot Singh Mathoda — Portfolio",
    description:
      "Full-stack developer & AI enthusiast building at the intersection of AI and software engineering.",
    url: "https://akaaljotmathoda.com",
    siteName: "Akaaljot Mathoda",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise-overlay">{children}</body>
    </html>
  );
}