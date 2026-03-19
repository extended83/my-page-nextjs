import { getPage } from "@/api/utils/getData/getData";
import { AppLocale } from "@/app/types/navigation";
import { HomeCards } from "@/components/Home/HomeCards";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

async function loader() {
  try {
    const data = await getPage("home-page");
    if (!data || !("data" in data) || !data.data) {
      notFound();
    }

    return data.data;
  } catch (error) {
    console.error("Nie udalo sie pobrac home-page ze Strapi:", error);
    return null;
  }
}

export default async function Home() {
  const locale = (await getLocale()) as AppLocale;

  const data = await loader();
  console.log({ data });

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

        <HomeCards locale={locale} />
      </div>
    </div>
  );
}
