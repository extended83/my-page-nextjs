import type { HeroSectionProps } from "@/components/heroSection/HeroSection.types";
import type { InfoBlockProps } from "@/types/types";

export type Block = HeroSectionProps | InfoBlockProps;

export interface BlockRendererProps {
  blocks: Block[];
}
