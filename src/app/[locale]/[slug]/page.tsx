import { AppLocale } from "@/app/types/navigation";
import { getArticleBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";

type ArticlePageProps = {
  params: Promise<{
    locale: AppLocale;
    slug: string;
  }>;
};

function extractRichTextBlocks(
  blocks: Array<{ __component: string; id: number; body?: string | null }>
) {
  return blocks.filter(
    (block) => block.__component === "shared.rich-text" && block.body
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const richTextBlocks = extractRichTextBlocks(article.blocks);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {article.title}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {richTextBlocks.map((block) => (
            <p
              key={block.id}
              className="text-lg text-gray-700 whitespace-pre-line"
            >
              {block.body}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
