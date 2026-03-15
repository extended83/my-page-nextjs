import { AppLocale } from "@/app/types/navigation";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL) {
  throw new Error("Brakuje STRAPI_URL w pliku .env.local");
}

type ArticleLocalization = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale: AppLocale;
};

type ArticleBlock = {
  __component: string;
  id: number;
  body?: string | null;
};

type ArticleCategory = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  locale: AppLocale;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: ArticleBlock[];
  localizations: ArticleLocalization[];
  category: ArticleCategory | null;
};

type StrapiArticlesResponse = {
  data: Article[];
};

type GetArticlesOptions = {
  locale: AppLocale;
  categorySlug?: string;
  slug?: string;
};

function getStrapiHeaders() {
  if (!STRAPI_API_TOKEN) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  };
}

function buildArticlesUrl({ locale, categorySlug, slug }: GetArticlesOptions) {
  const params = new URLSearchParams();

  params.set("locale", locale);
  params.set("sort[0]", "id:asc");
  params.set("populate[0]", "blocks");
  params.set("populate[1]", "localizations");
  params.set("populate[2]", "category");

  if (categorySlug) {
    params.set("filters[category][slug][$eq]", categorySlug);
  }

  if (slug) {
    params.set("filters[slug][$eq]", slug);
  }

  return `${STRAPI_URL}/api/articles?${params.toString()}`;
}

export async function getArticles(
  options: GetArticlesOptions
): Promise<Article[]> {
  const response = await fetch(buildArticlesUrl(options), {
    cache: "no-store",
    headers: getStrapiHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Blad pobierania ze Strapi: ${response.status}`);
  }

  const json: StrapiArticlesResponse = await response.json();

  return json.data;
}

export async function getNavigationArticles(locale: AppLocale) {
  return getArticles({
    locale,
    categorySlug: "navigation",
  });
}

export async function getArticleBySlug(slug: string, locale: AppLocale) {
  const articles = await getArticles({
    locale,
    slug,
  });

  return articles[0] ?? null;
}
