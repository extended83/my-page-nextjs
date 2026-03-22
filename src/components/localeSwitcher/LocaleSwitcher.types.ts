import type { NavItem } from "@/app/types/navigation";
import type { TextTone } from "@/types/types";

export interface LocaleSwitcherProps {
  items: NavItem[];
  isTransparent?: boolean;
  textTone?: TextTone;
}
