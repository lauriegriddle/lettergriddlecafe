import './globals.css';

export const metadata = {
  title: 'The Letter Griddle Cafe',
  description: 'Come for the trivia, pancakes, and coffee. Stay for the tea. Cozy vignettes from Griddle Falls paired with word puzzles.',
  keywords: ['Letter Griddle', 'word puzzle', 'cafe', 'stories', 'vignettes', 'trivia', 'Griddle Falls'],
  authors: [{ name: 'Letter Griddle' }],
  openGraph: {
    title: 'The Letter Griddle Cafe',
    description: 'Come for the trivia, pancakes, and coffee. Stay for the tea.',
    url: 'https://lettergriddlecafe.com',
    siteName: 'The Letter Griddle Cafe',
    images: [
      {
        url: '/og-image.svg',
        width: 400,
        height: 200,
        alt: 'The Letter Griddle Cafe',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Letter Griddle Cafe',
    description: 'Come for the trivia, pancakes, and coffee. Stay for the tea.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
