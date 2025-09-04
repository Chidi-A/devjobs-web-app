import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import { ThemeProvider } from '../_components/theme-context';
import Header from '../_components/Header';
import './globals.css';

const kumbhSans = Kumbh_Sans({
  variable: '--font-kumbh-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'devjobs',
  description: 'Find your next developer job',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kumbhSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
