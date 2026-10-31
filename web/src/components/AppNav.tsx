"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNav() {
  const pathname = usePathname();
  const active = pathname === "/listem" ? "/listem" : pathname === "/hakkinda" ? "/hakkinda" : "/";
  return <header className="app-header">
    <Link href="/" className="brand touch-target"><span className="brand-mark" aria-hidden="true">i</span>İçerik Asistanı</Link>
    <nav className="nav" aria-label="Ana gezinme">
      {[["/", "Yeni analiz"], ["/listem", "Listem"], ["/hakkinda", "Hakkında"]].map(([href, label]) =>
        <Link key={href} href={href} className="touch-target" aria-current={href === active ? "page" : undefined}>{label}</Link>)}
    </nav>
  </header>;
}
