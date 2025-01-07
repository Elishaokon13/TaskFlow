import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="TaskFlow - Blockchain-Based Task Manager" />
        <meta property="og:description" content="Manage your tasks seamlessly on the blockchain. Add, complete, and delete tasks with full transparency and security." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TaskFlow - Blockchain-Based Task Manager" />
        <meta name="twitter:description" content="Manage your tasks seamlessly on the blockchain. Add, complete, and delete tasks with full transparency and security." />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image.png" />
        <meta name="twitter:site" content="@monnadevrel" />
        <meta name="twitter:creator" content="@monnadevrel" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#6B46C1" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
