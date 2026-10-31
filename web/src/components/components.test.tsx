import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Action, AppNav, IngredientRow, InputField, LegalNote, Notice, ProcessState, SavedCard, legalText } from "./index";

const navigation = vi.hoisted(() => ({ pathname: "/listem" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Ortak tasarım bileşenleri", () => {
  it.each([
    ["avoid", "Kaçınılması önerilir"], ["caution", "Dikkat"], ["none", "Risk yok"],
  ] as const)("%s sınıfını adıyla sunar ve ayrıntıları açıp kapatır", (classification, label) => {
    render(<IngredientRow name="Süt" classification={classification} reason="Süt proteini alerjisinde uygun olmayabilir."
      uncertainty="Etiketten doğrulanmalı." groups={["Süt alerjisi olanlar"]} />);
    const toggle = screen.getByRole("button", { name: new RegExp(`Süt.*${label}`) });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Süt proteini alerjisinde uygun olmayabilir.")).not.toBeVisible();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Süt proteini alerjisinde uygun olmayabilir.")).toBeVisible();
    expect(screen.getByText("Etiketten doğrulanmalı.")).toBeVisible();
    expect(screen.getByText("İlgili gruplar: Süt alerjisi olanlar")).toBeVisible();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Etiketten doğrulanmalı.")).not.toBeVisible();
  });

  it("tahmin uyarısını kapatılamaz olarak ve fotoğraf bağlantısıyla sunar", () => {
    render(<Notice variant="estimate" uploadHref="/#etiket">Ürün adına göre tahmin edildi.</Notice>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "İçindekiler fotoğrafını yükle" })).toHaveAttribute("href", "/#etiket");
    expect(screen.getByText("Tahmini içerik – etiketten doğrulanmadı.")).toBeVisible();
  });

  it("isteğe bağlı bilgi bildirimini kapatır", () => {
    const onDismiss = vi.fn();
    render(<Notice variant="info" onDismiss={onDismiss}>Bilgi metni</Notice>);
    fireEvent.click(screen.getByRole("button", { name: "Bildirimi kapat" }));
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("hız sınırında Türkçe süre gösterir ve süre bitince yeniden denemeyi açar", () => {
    vi.useFakeTimers();
    const onRetry = vi.fn();
    render(<ProcessState variant="rateLimit" retryAfterSeconds={2} onRetry={onRetry} />);
    const retry = screen.getByRole("button", { name: "Yeniden dene" });
    expect(screen.getByRole("status")).toHaveTextContent("2 saniye bekleyin");
    expect(retry).toBeDisabled();
    fireEvent.click(retry);
    expect(onRetry).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByRole("status")).toHaveTextContent("1 saniye bekleyin");
    expect(retry).toBeDisabled();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(retry).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent("Şimdi yeniden deneyebilirsiniz.");
    fireEvent.click(retry);
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("geri sayım kaldırılınca zamanlayıcıyı temizler", () => {
    vi.useFakeTimers();
    const { unmount } = render(<ProcessState variant="rateLimit" retryAfterSeconds={3} />);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("ilerlemeyi yüzde olmadan ve boş durumun eylemini gösterir", () => {
    const { rerender } = render(<ProcessState variant="loading" />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("value");
    rerender(<ProcessState variant="empty" />);
    expect(screen.getByRole("link", { name: "Yeni analiz" })).toHaveAttribute("href", "/");
  });

  it("hata durumunda kurtarma eylemini çağırır", () => {
    const onRetry = vi.fn();
    render(<ProcessState variant="error" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: "Yeniden fotoğraf çek" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("alanın yardım ve hata açıklamalarını birleştirir", () => {
    render(<InputField label="Ürün adı" help="Markayı ekleyin." error="Ürün adı gerekli." aria-describedby="ek-bilgi" />);
    const input = screen.getByRole("textbox", { name: "Ürün adı" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Markayı ekleyin. Ürün adı gerekli.");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toHaveLength(3);
  });

  it.each(["filled", "outlined", "text"] as const)("%s eyleminin devre dışı durumunu açıklar", variant => {
    const onClick = vi.fn();
    render(<Action variant={variant} disabled disabledReason="Lütfen bekleyin." onClick={onClick}>Analiz et</Action>);
    const button = screen.getByRole("button", { name: "Analiz et" });
    expect(button).toHaveClass("touch-target", `action-${variant}`);
    expect(button).toBeDisabled();
    expect(button).toHaveAccessibleDescription("Lütfen bekleyin.");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each(["/", "/listem", "/hakkinda"])("%s yolunun etkin bağlantısını işaretler", pathname => {
    navigation.pathname = pathname;
    render(<AppNav />);
    const links = screen.getAllByRole("link");
    for (const link of links) expect(link).toHaveClass("touch-target");
    const current = document.querySelectorAll('[aria-current="page"]');
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", pathname);
  });

  it("dokunma hedefi kuralını ve layout bağlantısını korur", () => {
    const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const tokens = readFileSync(resolve(process.cwd(), "src/theme/tokens.css"), "utf8");
    expect(css).toContain(".touch-target { min-height: var(--touch-target); min-width: var(--touch-target); }");
    expect(tokens).toContain("--touch-target: 44px");
    const layout = readFileSync(resolve(process.cwd(), "src/app/layout.tsx"), "utf8");
    expect(layout).toContain("<AppNav />");
  });

  it("kayıt kartında tarihi, dağılımı, açma ve silme eylemlerini sunar", () => {
    const onDelete = vi.fn();
    render(<SavedCard name="Kaşar peyniri" category="Gıda" summary="Süt içeriğine dikkat edin." href="/sonuc?id=1"
      source="Etiketten okundu" confidence="Yüksek" date="30 Ekim 2026" counts={{ avoid: 0, caution: 1, none: 4 }} onDelete={onDelete} />);
    expect(screen.getByText("30 Ekim 2026")).toBeVisible();
    expect(screen.getByText("1 dikkat")).toBeVisible();
    expect(screen.getByRole("link", { name: "Analizi aç →" })).toHaveAttribute("href", "/sonuc?id=1");
    fireEvent.click(screen.getByRole("button", { name: "Kaşar peyniri kaydını sil" }));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("örnek kartta örnek etiketini ve tahmin uyarısını gösterir; silme ve tarih içermez", () => {
    render(<SavedCard variant="example" estimated name="Örnek ürün" category="Gıda" summary="Örnek açıklama" href="/sonuc"
      source="Ürün adından tahmin" confidence="Orta" counts={{ avoid: 0, caution: 2, none: 2 }} />);
    expect(screen.getByText("Örnek ürün", { selector: "span" })).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(document.querySelector("time")).toBeNull();
    expect(screen.getByRole("link", { name: "İçindekiler fotoğrafını yükle" })).toBeVisible();
  });

  it("sabit bilgilendirme metnini eksiksiz gösterir", () => {
    render(<LegalNote />);
    expect(screen.getByLabelText("Bilgilendirme sınırları")).toHaveTextContent(legalText);
  });
});
