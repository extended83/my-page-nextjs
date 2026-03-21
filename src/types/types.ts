export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface LogoProps {
  logoText: string;
  image: ImageProps;
}

export type Theme = "turquoise" | "orange";

export type ComponentType = "blocks.hero-section" | "blocks.info-block";

export interface BaseBlock<
  T extends ComponentType,
  D extends object = Record<string, unknown>,
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export interface InfoBlockProps extends BaseBlock<"blocks.info-block"> {
  theme: Theme;
  reversed?: boolean;
  headline: string;
  content: string;
  image: ImageProps;
  cta?: LinkProps;
}
