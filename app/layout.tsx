import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

import { cn } from '@/lib/utils';
import { NextAuthProvider } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Dimas Yusuf Qurohman',
  description: 'A Full Stack Developer from Indonesia',
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
    description: 'A Full Stack Developer from Indonesia',
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
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
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
          'min-h-screen bg-background font-sans antialiased max-w-screen-md mx-auto',
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
