"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { NavItem } from "@/app/types/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface NavbarProps {
  items: NavItem[];
}

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

const Navbar = ({ items }: NavbarProps) => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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

interface NavLinkProps {
  item: NavItem;
  href: string;
  isActive: boolean;
}

const NavLink = ({ item, href, isActive }: NavLinkProps) => {
  const t = useTranslations("Navigation");

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
      }`}
      title={item.kind === "static" ? t(item.description ?? "") : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {item.kind === "static" ? t(item.label) : item.label}
    </Link>
  );
};

export default Navbar;
