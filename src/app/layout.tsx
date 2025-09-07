import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
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
  icons: {
    icon: [{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kumbhSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="devjobs-theme"
          enableSystem={true}
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
