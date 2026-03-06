import Link from "next/link";
import { NAV_ITEMS } from "@/app/config/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  // Filtrujemy, aby nie pokazywać linku do strony głównej
  const navigationItems = NAV_ITEMS.filter((item) => item.href !== "/");
  console.log({ navigationItems });

  const t = useTranslations("Navigation");

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
              href={item.href}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {t(item.label)}
              </h2>
              <p className="text-gray-600">{t(item.description)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
