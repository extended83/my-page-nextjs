"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { NavLinkProps } from "@/components/navbar/Navbar.types";
import styles from "@/components/navbar/NavLink.module.css";

const linkToneClassMap = {
  inverse: {
    active: "bg-white/20",
    inactive: "hover:bg-white/10",
    text: styles.linkInverse,
  },
  primary: {
    active: "bg-black/10",
    inactive: "hover:bg-black/5",
    text: styles.linkPrimary,
  },
} as const;

export function NavLink({
  item,
  href,
  isActive,
  textTone = "primary",
}: NavLinkProps) {
  const t = useTranslations("Navigation");
  const toneClasses = linkToneClassMap[textTone];

  return (
    <Link
      href={href}
      className={`${toneClasses.text} uppercase rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive ? toneClasses.active : toneClasses.inactive
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.kind === "static" ? t(item.label) : item.label}
    </Link>
  );
}

