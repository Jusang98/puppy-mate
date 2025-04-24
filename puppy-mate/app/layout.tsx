import './globals.css';
import QueryProvider from './QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import RootFooter from './components/RootFooter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
        <RootFooter /> {/* 푸터 추가 */}
      </body>
    </html>
  );
}
