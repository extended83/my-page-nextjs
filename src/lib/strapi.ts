const STRAPI_URL = process.env.STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("Brakuje STRAPI_URL w pliku .env.local");
}

type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type StrapiArticlesResponse = {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export async function getArticles(): Promise<Article[]> {
  const response = await fetch(`${STRAPI_URL}/api/articles`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Błąd pobierania ze Strapi: ${response.status}`);
  }

  const json: StrapiArticlesResponse = await response.json();

  return json.data;
}
