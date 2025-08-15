import type { Metadata } from 'next';
import { ThemeProvider } from '../context/ThemeProvider';
import { Header } from '../components/Header/Header';

export const metadata: Metadata = {
  title: 'Rick and Morty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
