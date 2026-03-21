import Link from "next/link";
import { HOME_PAGE_CARDS } from "@/app/config/homePageCards";
import type { HomeCardsProps } from "@/components/homeCards/HomeCards.types";
import { buildLocalizedHref } from "@/components/homeCards/HomeCards.utils";

export function HomeCards({ locale }: HomeCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {HOME_PAGE_CARDS.map((card) => (
        <Link
          key={card.id}
          href={buildLocalizedHref(locale, card.href[locale])}
          className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            {card.title[locale]}
          </h2>
          <p className="text-gray-600">{card.description[locale]}</p>
        </Link>
      ))}
    </div>
  );
}
