import type { CSSProperties } from "react";
import Link from "next/link";
import { StrapiImage } from "@/components/strapiImage/StrapiImage";
import styles from "@/components/heroSection/HeroSection.module.css";
import type { HeroSectionProps } from "@/components/heroSection/HeroSection.types";

const themeClassMap = {
  orange: {
    cta: styles.ctaOrange,
    logo: styles.logoOrange,
  },
  turquoise: {
    cta: styles.ctaTurquoise,
    logo: "",
  },
} as const;

const textToneClassMap = {
  inverse: {
    heading: styles.headlineOrange,
    meta: styles.metaText,
    description: styles.description,
  },
  primary: {
    heading: styles.headlinePrimary,
    meta: styles.metaTextPrimary,
    description: styles.descriptionPrimary,
  },
} as const;

const overlayAlphaMap = {
  low: {
    solid: 0.2,
    top: 0.3,
    bottom: 0.12,
  },
  medium: {
    solid: 0.3,
    top: 0.46,
    bottom: 0.22,
  },
  high: {
    solid: 0.5,
    top: 0.6,
    bottom: 0.3,
  },
  strong: {
    solid: 0.7,
    top: 0.85,
    bottom: 0.6,
  },
} as const;

const expandHex = (value: string) =>
  value
    .split("")
    .map((character) => `${character}${character}`)
    .join("");

const parseHexColor = (hexColor: string) => {
  const normalizedHex = hexColor.trim().replace(/^#/, "");

  if (![3, 4, 6, 8].includes(normalizedHex.length)) {
    return null;
  }

  const expandedHex =
    normalizedHex.length <= 4 ? expandHex(normalizedHex) : normalizedHex;

  if (!/^[0-9a-fA-F]+$/.test(expandedHex)) {
    return null;
  }

  const hasAlpha = expandedHex.length === 8;

  return {
    r: Number.parseInt(expandedHex.slice(0, 2), 16),
    g: Number.parseInt(expandedHex.slice(2, 4), 16),
    b: Number.parseInt(expandedHex.slice(4, 6), 16),
    a: hasAlpha ? Number.parseInt(expandedHex.slice(6, 8), 16) / 255 : 1,
  };
};

const createOverlayColor = (
  color: { r: number; g: number; b: number; a: number },
  alpha: number,
) => `rgb(${color.r} ${color.g} ${color.b} / ${color.a * alpha})`;

export const HeroSection = ({
  theme,
  heading,
  description,
  cta,
  image,
  logo,
  author,
  publishedAt,
  overlayTone = "light",
  overlayColor = null,
  overlayStrength = "high",
  hasOverlayGradient = true,
  textTone = "primary",
}: Readonly<HeroSectionProps>) => {
  const resolvedTheme = theme === "turquoise" ? "turquoise" : "orange";
  const themeClasses = themeClassMap[resolvedTheme];
  const textToneClasses = textToneClassMap[textTone];
  const overlayVariantClass = hasOverlayGradient
    ? styles.backgroundOverlayGradient
    : styles.backgroundOverlaySolid;
  const overlayAlpha = overlayAlphaMap[overlayStrength];
  const parsedOverlayColor = overlayColor ? parseHexColor(overlayColor) : null;
  const baseOverlayColor =
    parsedOverlayColor ??
    (overlayTone === "light"
      ? { r: 255, g: 255, b: 255, a: 1 }
      : { r: 0, g: 0, b: 0, a: 1 });
  const overlayStyle = {
    "--hero-overlay-solid": createOverlayColor(
      baseOverlayColor,
      overlayAlpha.solid,
    ),
    "--hero-overlay-top": createOverlayColor(
      baseOverlayColor,
      overlayAlpha.top,
    ),
    "--hero-overlay-bottom": createOverlayColor(
      baseOverlayColor,
      overlayAlpha.bottom,
    ),
  } as CSSProperties;

  return (
    <section className="relative isolate mb-[125px] min-h-[830px] w-full pt-[220px]">
      <div className={`absolute inset-0 z-0 ${styles.background}`}>
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          className={`h-full w-full object-cover object-center object-bottom ${styles.backgroundImage}`}
          width={1920}
          height={1080}
        />
        <div
          className={`${styles.backgroundOverlay} ${overlayVariantClass}`}
          style={overlayStyle}
        ></div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-[48px]">
        <div className={`mb-[32px] max-w-[720px] ${textToneClasses.heading}`}>
          <h1 className="text-[4rem] leading-[1.05] font-bold">{heading}</h1>
          {author && (
            <p
              className={`mt-[10px] mb-[10px] text-[1.125rem] font-bold ${textToneClasses.meta}`}
            >
              {author}
            </p>
          )}
          {publishedAt && (
            <p
              className={`mt-[10px] text-[1.125rem] font-normal ${textToneClasses.meta}`}
            >
              {publishedAt}
            </p>
          )}
        </div>
        {description && (
          <div className={textToneClasses.description}>{description}</div>
        )}
        {cta && (
          <Link
            href={cta.href ?? "#"}
            target={cta.isExternal ? "_blank" : "_self"}
            rel={cta.isExternal ? "noreferrer" : undefined}
            className={`${styles.cta} ${themeClasses.cta}`}
          >
            {cta.text}
          </Link>
        )}
      </div>
      {logo && (
        <div className="absolute bottom-0 left-1/2 z-10 translate-x-[-50%] translate-y-[50%]">
          <StrapiImage
            src={logo.image.url}
            alt={logo.image.alternativeText || "No alternative text provided"}
            className={`h-[120px] w-[120px] ${themeClasses.logo}`}
            width={120}
            height={120}
          />
        </div>
      )}
    </section>
  );
};
