export type AppLocale = "en" | "pl";

export interface NavItem {
  kind: "static" | "cms";
  label: string;
  href: string;
  description?: string | null;
  localizations?: Partial<Record<AppLocale, string>>;
}
