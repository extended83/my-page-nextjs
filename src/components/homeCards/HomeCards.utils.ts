import { AppLocale } from "@/app/types/navigation";

export function buildLocalizedHref(locale: AppLocale, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
