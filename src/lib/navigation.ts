import { HOME_NAV_ITEM } from "@/app/config/navigation";
import { AppLocale, NavItem } from "@/app/types/navigation";
import { Article, getNavigationArticles } from "@/lib/strapi";

function getLocalizedArticleHref(article: Article) {
  return `/${article.slug}`;
}

export function mapArticleToNavItem(article: Article): NavItem {
  const localizations = article.localizations.reduce<
    Partial<Record<AppLocale, string>>
  >(
    (result, localization) => {
      result[localization.locale] = `/${localization.slug}`;
      return result;
    },
    {
      [article.locale]: getLocalizedArticleHref(article),
    }
  );

  return {
    kind: "cms",
    label: article.title,
    href: getLocalizedArticleHref(article),
    description: article.description,
    localizations,
  };
}

export async function getNavigationItems(locale: AppLocale): Promise<NavItem[]> {
  const articles = await getNavigationArticles(locale);

  return [HOME_NAV_ITEM, ...articles.map(mapArticleToNavItem)];
}
