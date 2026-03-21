"use client";

import Link from "next/link";
import { LocaleSwitcher } from "@/components/localeSwitcher/LocaleSwitcher";
import type {
  NavbarProps,
  NavLinkProps,
} from "@/components/navbar/Navbar.types";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

const Navbar = ({ items }: NavbarProps) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            {items.map((item) => (
              <NavLink
                key={`${item.kind}-${item.href}`}
                item={item}
                href={buildLocalizedHref(locale, item.href)}
                isActive={pathname === buildLocalizedHref(locale, item.href)}
              />
            ))}
            <LocaleSwitcher items={items} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ item, href, isActive }: NavLinkProps) => {
  const t = useTranslations("Navigation");

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.kind === "static" ? t(item.label) : item.label}
    </Link>
  );
};

export default Navbar;
