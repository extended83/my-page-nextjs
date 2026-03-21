import type { NavItem } from "@/app/types/navigation";

export interface NavbarProps {
  items: NavItem[];
}

export interface NavLinkProps {
  item: NavItem;
  href: string;
  isActive: boolean;
}
