import { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Layout/Navbar";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Moja Strona - Profesjonalne Usługi",
  description: "Oferujemy profesjonalne usługi web developmentu",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
