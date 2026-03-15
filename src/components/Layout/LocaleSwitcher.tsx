"use client";

import Link from "next/link";
import { NavItem } from "@/app/types/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

interface LocaleSwitcherProps {
  items: NavItem[];
}

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function LocaleSwitcher({ items }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const switchTo = locale === "pl" ? "en" : "pl";

  const currentItem = items.find(
    (item) => pathname === buildLocalizedHref(locale, item.href)
  );

  const targetHref =
    currentItem?.kind === "cms"
      ? currentItem.localizations?.[switchTo] ?? "/"
      : currentItem?.href ?? "/";

  return (
    <Link
      href={buildLocalizedHref(switchTo, targetHref)}
      className="px-3 py-1 rounded border"
    >
      {switchTo.toUpperCase()}
    </Link>
  );
}
