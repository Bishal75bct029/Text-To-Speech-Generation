import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

import './globals.css';
import AudioProvider from './providers/AudioProviders';
import { ConvexClientProvider } from './providers/ConvexClerkProvider';

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
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/icons/auth-logo.svg',
        },
        variables: {
          colorBackground: '#15171c',
          colorPrimary: '',
          colorText: 'white',
          colorInputBackground: '#1b1f29',
          colorInputText: 'white',
        },
      }}
    >
      <AudioProvider>
        <html lang="en">
          <body className={` ${manRope.variable} antialiased`}>
            <Toaster />
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </body>
        </html>
      </AudioProvider>
    </ClerkProvider>
  );
}
