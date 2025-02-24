import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import './globals.css';

const manRope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Podcast app',
  description: 'An AI app to convert text to speech.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${manRope.variable} antialiased`}>{children}</body>
    </html>
  );
}
