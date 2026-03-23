import { getPage } from "@/api/utils/getData/getData";
import { AppLocale } from "@/app/types/navigation";
import { BlockRenderer } from "@/components/blockRenderer/BlockRenderer";
import { HomeCards } from "@/components/homeCards/HomeCards";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { stringify } from "qs";

const homePageQuery = stringify(
  {
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

async function loader() {
  try {
    const data = await getPage(`home-page?${homePageQuery}`);
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
  const blocks = data?.blocks || [];

  console.log({ blocks });

  return (
    <div className="-mt-16 min-h-screen bg-gray-50">
      <BlockRenderer blocks={blocks} />
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <HomeCards locale={locale} />
      </div>
    </div>
  );
}

