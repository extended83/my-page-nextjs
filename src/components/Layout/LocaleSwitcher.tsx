"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = locale === "pl" ? "en" : "pl";

  return (
    <>
      <Link
        href={
          // @ts-expect-error current route params match pathname
          { pathname, params }
        }
        locale={switchTo}
        className="px-3 py-1 rounded border"
      >
        {switchTo.toUpperCase()}
      </Link>
    </>
  );
}
