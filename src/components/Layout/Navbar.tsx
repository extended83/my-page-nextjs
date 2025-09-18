'use client';

import { NAV_ITEMS } from '@/app/config/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  item: {
    label: string;
    href: string;
    description?: string;
  };
  isActive: boolean;
}

const NavLink = ({ item, isActive }: NavLinkProps) => {
  return (
    <Link
      href={item.href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
      }`}
      title={item.description}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}
    </Link>
  );
};

export default Navbar;