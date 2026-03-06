import type {routing} from '@/i18n/routing';

// Wszystkie zdefiniowane w pathnames klucze tras
type RouteKey = keyof typeof routing['pathnames'];

export type LocaleSwitcherProps = {
  routeKey: RouteKey;
  params?: Record<string, string>; // jeśli masz dynamiczne
  replace?: boolean;
};