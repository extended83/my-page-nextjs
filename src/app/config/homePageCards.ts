import { AppLocale } from "@/app/types/navigation";

export interface HomePageCard {
  id: string;
  title: Record<AppLocale, string>;
  description: Record<AppLocale, string>;
  href: Record<AppLocale, string>;
}

export const HOME_PAGE_CARDS: HomePageCard[] = [
  {
    id: "about",
    title: {
      pl: "O nas",
      en: "About us",
    },
    description: {
      pl: "Poznaj nasz zespół, doświadczenie i sposób, w jaki pracujemy z klientami.",
      en: "Learn more about our team, our experience, and how we work with clients.",
    },
    href: {
      pl: "/o-nas",
      en: "/about-us",
    },
  },
  {
    id: "offer",
    title: {
      pl: "Oferta",
      en: "Offer",
    },
    description: {
      pl: "Sprawdź zakres usług i zobacz, w czym możemy wesprzeć Twój projekt.",
      en: "Explore our services and see how we can support your project.",
    },
    href: {
      pl: "/oferta",
      en: "/offer",
    },
  },
  {
    id: "contact",
    title: {
      pl: "Kontakt",
      en: "Contact",
    },
    description: {
      pl: "Znajdź najważniejsze dane kontaktowe i skontaktuj się z nami wygodnym kanałem.",
      en: "Find the key contact details and reach out through the most convenient channel.",
    },
    href: {
      pl: "/kontakt",
      en: "/contact",
    },
  },
];
