export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Strona Główna",
    href: "/",
    description: "Powrót do strony głównej",
  },
  {
    label: "O nas",
    href: "/about",
    description: "Dowiedz się więcej o naszej firmie",
  },
  {
    label: "Oferta",
    href: "/offer",
    description: "Zobacz nasze usługi",
  },
  {
    label: "Kontakt",
    href: "/contact",
    description: "Skontaktuj się z nami",
  },
];