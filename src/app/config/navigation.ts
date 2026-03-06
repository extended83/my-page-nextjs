export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "home",
    href: "/",
    description: "homeDescription",
  },
  {
    label: "about",
    href: "/about",
    description: "aboutDescription",
  },
  {
    label: "offer",
    href: "/offer",
    description: "offerDescription",
  },
  {
    label: "contact",
    href: "/contact",
    description: "contactDescription",
  },
];
