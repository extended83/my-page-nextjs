import type { NavItem } from "@/app/types/navigation";
import type { TextTone } from "@/types/types";

export interface NavbarProps {
  items: NavItem[];
  isTransparent?: boolean;
  overlayTextTone?: TextTone;
  solidTextTone?: TextTone;
}

export interface NavLinkProps {
  item: NavItem;
  href: string;
  isActive: boolean;
  textTone?: TextTone;
}
