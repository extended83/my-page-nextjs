"use client";

import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/localeSwitcher/LocaleSwitcher";
import type { NavbarProps } from "@/components/navbar/Navbar.types";
import { NavLink } from "@/components/navbar/NavLink";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import styles from "@/components/navbar/Navbar.module.css";

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

const Navbar = ({
  items,
  isTransparent = false,
  overlayTextTone = "inverse",
  solidTextTone = "primary",
}: NavbarProps) => {
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
  const currentTextTone = shouldRenderTransparent
    ? overlayTextTone
    : solidTextTone;
  const navClassName = shouldRenderTransparent
    ? "bg-transparent transition-colors"
    : "bg-white shadow-md transition-colors";

  return (
    <nav className={`${styles.navbar} ${navClassName}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            {items.map((item) => (
              <NavLink
                key={`${item.kind}-${item.href}`}
                item={item}
                href={buildLocalizedHref(locale, item.href)}
                isActive={pathname === buildLocalizedHref(locale, item.href)}
                textTone={currentTextTone}
              />
            ))}
            <LocaleSwitcher
              items={items}
              isTransparent={shouldRenderTransparent}
              textTone={currentTextTone}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
