"use client";

import Link from "next/link";
import type { NavItem } from "@/app/types/navigation";
import type { LocaleSwitcherProps } from "@/components/localeSwitcher/LocaleSwitcher.types";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function LocaleSwitcher({
  items,
  isTransparent = false,
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const switchTo = locale === "pl" ? "en" : "pl";

  const currentItem = items.find(
    (item: NavItem) => pathname === buildLocalizedHref(locale, item.href),
  );

  const targetHref =
    currentItem?.kind === "cms"
      ? (currentItem.localizations?.[switchTo] ?? "/")
      : (currentItem?.href ?? "/");

  return (
    <Link
      href={buildLocalizedHref(switchTo, targetHref)}
      className={`flex items-center rounded border px-3 py-1 text-sm font-medium transition-colors ${
        isTransparent
          ? "border-white/70 bg-white/10 text-white hover:bg-white/20"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {switchTo.toUpperCase()}
    </Link>
  );
}
