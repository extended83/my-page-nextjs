import { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AppLocale } from "@/app/types/navigation";
import Navbar from "@/components/navbar/Navbar";
import { routing } from "@/i18n/routing";
import { getNavigationItems } from "@/lib/navigation";

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
    <NextIntlClientProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar items={await getNavigationItems(locale as AppLocale)} />
        <main className="flex-grow">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
