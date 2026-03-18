import Link from "next/link";
import { HOME_PAGE_CARDS } from "@/app/config/homePageCards";
import { AppLocale } from "@/app/types/navigation";

interface HomeCardsProps {
  locale: AppLocale;
}

function buildLocalizedHref(locale: AppLocale, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export function HomeCards({ locale }: HomeCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {HOME_PAGE_CARDS.map((card) => (
        <Link
          key={card.id}
          href={buildLocalizedHref(locale, card.href[locale])}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {card.title[locale]}
          </h2>
          <p className="text-gray-600">{card.description[locale]}</p>
        </Link>
      ))}
    </div>
  );
}
