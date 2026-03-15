import Link from "next/link";
import { AppLocale } from "@/app/types/navigation";
import { getNavigationItems } from "@/lib/navigation";
import { getLocale, getTranslations } from "next-intl/server";

function buildLocalizedHref(locale: string, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

export default async function Home() {
  const t = await getTranslations("Navigation");
  const locale = (await getLocale()) as AppLocale;
  const navigationItems = (await getNavigationItems(locale)).filter(
    (item) => item.kind === "cms"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Witaj na naszej stronie!
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          To jest przykładowa strona główna. Zapraszamy do zapoznania się z
          naszą ofertą.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={buildLocalizedHref(locale, item.href)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.label}
              </h2>
              <p className="text-gray-600">
                {item.description || t("homeDescription")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
