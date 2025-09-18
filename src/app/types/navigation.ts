import { NavItem } from '@/app/config/navigation';


export interface NavigationProps {
  items: NavItem[];
  currentPath: string;
}