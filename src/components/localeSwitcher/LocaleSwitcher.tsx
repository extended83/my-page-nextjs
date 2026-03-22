"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { NavItem } from "@/app/types/navigation";
import type { LocaleSwitcherProps } from "@/components/localeSwitcher/LocaleSwitcher.types";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

function getLocaleSwitcherStyle(
  isTransparent: boolean,
  textTone: "primary" | "inverse",
): CSSProperties {
  if (!isTransparent) {
    return {
      color: "var(--color-text-primary)",
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
    };
  }

  if (textTone === "inverse") {
    return {
      color: "var(--color-text-inverse)",
      backgroundColor: "rgb(255 255 255 / 0.10)",
      borderColor: "rgb(255 255 255 / 0.70)",
    };
  }

  return {
    color: "var(--color-text-primary)",
    backgroundColor: "rgb(255 255 255 / 0.65)",
    borderColor: "rgb(17 33 29 / 0.20)",
  };
}

export function LocaleSwitcher({
  items,
  isTransparent = false,
  textTone = "primary",
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
      className="flex items-center rounded border px-3 py-1 text-sm font-medium transition-colors"
      style={getLocaleSwitcherStyle(isTransparent, textTone)}
    >
      {switchTo.toUpperCase()}
    </Link>
  );
}
