import './globals.css';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    creator: `@${siteMetadata.social.twitter}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '42rem',
            padding: '2.625rem 1.3125rem',
          }}
        >
          <header>
            <h3
              style={{
                fontFamily: 'Montserrat, sans-serif',
                marginTop: 0,
              }}
            >
              <Link
                href="/"
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {siteMetadata.title}
              </Link>
            </h3>
          </header>
          <main>{children}</main>
          <footer style={{ marginTop: '2.625rem' }}>
            © {new Date().getFullYear()} {siteMetadata.author}
          </footer>
        </div>
      </body>
    </html>
  );
}
