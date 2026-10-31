import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppNav } from "../components/AppNav";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "İçerik Asistanı",
  description: "Ürün içeriklerini anlamanıza yardımcı olan asistan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <AppNav />
          <main id="icerik" className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
