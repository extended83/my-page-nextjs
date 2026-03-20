import { HeroSection } from "@/components/heroSection/HeroSection";
import { Block } from "@/components/types";

const blockRenderer = (block: Block, index: number) => {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    // case "blocks.info-block":
    //   return <InfoBlock {...block} key={index} />;
    default:
      return null;
  }
};

export const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  return blocks.map((block, index) => blockRenderer(block, index));
};
