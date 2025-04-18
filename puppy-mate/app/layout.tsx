'use client';
import './globals.css';
import QueryProvider from './QueryProvider';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <QueryProvider> */}
        {children}
        {/* </QueryProvider> */}
      </body>
    </html>
  );
}
