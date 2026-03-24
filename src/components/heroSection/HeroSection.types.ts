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
  contentLayout?: "left" | "center";
  image: ImageProps;
  cta?: LinkProps;
  logo?: LogoProps;
  author?: string;
  overlayTone?: "light" | "dark";
  overlayColor?: string | null;
  overlayStrength?: "low" | "medium" | "high" | "strong";
  hasOverlayGradient?: boolean;
  textTone?: TextTone;
  bottomRadius?: number | null;
}
