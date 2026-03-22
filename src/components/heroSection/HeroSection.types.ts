import type {
  BaseBlock,
  ImageProps,
  LinkProps,
  LogoProps,
  Theme,
  TextTone,
} from "@/types/types";

export interface HeroSectionProps extends BaseBlock<"blocks.hero-section"> {
  theme: Theme;
  heading: string;
  description?: string;
  image: ImageProps;
  cta?: LinkProps;
  logo?: LogoProps;
  author?: string;
  darken?: boolean;
  textTone?: TextTone;
}
