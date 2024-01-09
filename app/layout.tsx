import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Brutalist styled weather app made with next.js and Typescript',
  icons: {
    icon: ['/icons/favicon.ico?v=1'],
    apple: ['/icons/apple-touch-icon.png?v=1'],
    shortcut: ['/icons/apple-touch-icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
