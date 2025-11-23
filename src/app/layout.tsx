import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'RechargeRelay',
  description: "Share and get a free New Year recharge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <Script async={true} data-cfasync="false" src="//pl28118800.effectivegatecpm.com/7141edc3813cce93bfe6b52773a1fc95/invoke.js" />
        <Script type='text/javascript' src='//pl28118819.effectivegatecpm.com/1c/07/58/1c0758af931813740902f2f09f4a0dfc.js' />
      </head>
      <body className="font-body antialiased h-full">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
