import './globals.css';
import QueryProvider from './QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import RootFooter from './components/RootFooter';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="pb-16">
            {children}
          </div>
          <Toaster />
        </QueryProvider>
        <RootFooter /> {/* 푸터 추가 */}
      </body>
    </html>
  );
}
