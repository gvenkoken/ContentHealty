import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "tailwindcss/tailwind.css";
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
          <header>
            <Link href="/">İçerik Asistanı</Link>
            <nav aria-label="Ana gezinme">
              <Link href="/">Yeni analiz</Link>{" "}
              <Link href="/listem">Listem</Link>{" "}
              <Link href="/hakkinda">Hakkında</Link>
            </nav>
          </header>
          <main id="icerik">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
