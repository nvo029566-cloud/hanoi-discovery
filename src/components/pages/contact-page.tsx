import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function ContactPage({ locale = "vi" }: { locale?: Locale }) {
  const m = getMessages(locale).contact;
  const isEn = locale === "en";

  return (
    <PageShell>
      <SectionHeading
        id="contact-title"
        eyebrow={m.eyebrow}
        title={m.title}
        description={isEn ? "Where to find tourism information and visitor support for Hanoi." : "Nơi tìm thông tin du lịch và hỗ trợ du khách tại Hà Nội."}
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold">{isEn ? "Hanoi Department of Tourism" : "Sở Du lịch Hà Nội"}</h2>
          <p className="mt-3 text-muted-foreground">
            {isEn ? "Find current contact details and official visitor information on the department’s website." : "Tra cứu đầu mối liên hệ và thông tin hỗ trợ du khách trên trang của Sở."}
          </p>
          <a href="https://sodulich.hanoi.gov.vn/" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            {isEn ? "Visit the department website" : "Mở trang Sở Du lịch"}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </section>
        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold">{isEn ? "Preparing for your visit" : "Chuẩn bị chuyến đi"}</h2>
          <p className="mt-3 text-muted-foreground">
            {isEn ? "Read about getting around, when to go and where to stay." : "Xem cách di chuyển, thời điểm tham quan và gợi ý khu vực lưu trú."}
          </p>
          <Link href={localePath(locale, "/guide")} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-primary hover:border-primary/40">
            <Compass className="size-4" aria-hidden="true" />
            {isEn ? "Open the travel guide" : "Mở cẩm nang du lịch"}
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
