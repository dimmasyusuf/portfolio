import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Dimas Yusuf Qurohman',
  description: 'A Software Engineer based in Indonesia',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['Dimas Yusuf Qurohman', 'dimmasyusuf', 'dimmasyusuf portfolio'],
  authors: [
    {
      name: 'Dimas Yusuf Qurohman',
      url: 'https://www.linkedin.com/in/dimmasyusuf/',
    },
  ],
  icons: [
    { rel: 'icon', url: '/icons/icon-128x128.png' },
    { rel: 'apple-touch-icon', url: '/icons/icon-128x128.png' },
  ],
  metadataBase: new URL('https://dimmasyusuf.me/'),
  openGraph: {
    title: 'Dimas Yusuf Qurohman',
    description: 'A Software Engineer based in Indonesia',
    url: 'https://dimmasyusuf.me',
    siteName: 'Dimas Yusuf Qurohman',
    images: [
      {
        url: '/images/logo_light.svg',
        width: 128,
        height: 128,
        alt: 'Dimas Yusuf Qurohman',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'black' },
    { media: '(prefers-color-scheme: dark)', color: 'white' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-gradient-to-t from-neutral-50 dark:bg-none dark:bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
