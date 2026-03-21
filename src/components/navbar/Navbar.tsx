"use client";

import { useEffect, useState } from "react";
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

const Navbar = ({ items, isTransparent = false }: NavbarProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const homePath = buildLocalizedHref(locale, "/");
  const useTransparentMode =
    isTransparent &&
    (pathname === homePath || pathname === `${homePath}/`);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldRenderTransparent = useTransparentMode && !isScrolled;
  const navClassName = shouldRenderTransparent
    ? "bg-transparent transition-colors"
    : "bg-white shadow-md transition-colors";

  return (
    <nav
      className={navClassName}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            {items.map((item) => (
              <NavLink
                key={`${item.kind}-${item.href}`}
                item={item}
                href={buildLocalizedHref(locale, item.href)}
                isActive={pathname === buildLocalizedHref(locale, item.href)}
                isTransparent={shouldRenderTransparent}
              />
            ))}
            <LocaleSwitcher
              items={items}
              isTransparent={shouldRenderTransparent}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  item,
  href,
  isActive,
  isTransparent = false,
}: NavLinkProps) => {
  const t = useTranslations("Navigation");

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? isTransparent
            ? "bg-white/20 text-white"
            : "bg-blue-50 text-blue-600"
          : isTransparent
            ? "text-white hover:bg-white/10"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.kind === "static" ? t(item.label) : item.label}
    </Link>
  );
};

export default Navbar;
