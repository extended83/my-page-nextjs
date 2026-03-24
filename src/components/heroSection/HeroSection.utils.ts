import type { CSSProperties } from "react";
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

const DEFAULT_BOTTOM_RADIUS = 200;

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

export const getThemeClasses = (theme: HeroSectionProps["theme"]) => {
  const resolvedTheme = theme === "turquoise" ? "turquoise" : "orange";
  return themeClassMap[resolvedTheme];
};

export const getTextToneClasses = (textTone: HeroSectionProps["textTone"]) =>
  textToneClassMap[textTone ?? "primary"];

export const getOverlayVariantClass = (
  hasOverlayGradient: HeroSectionProps["hasOverlayGradient"],
) =>
  hasOverlayGradient
    ? styles.backgroundOverlayGradient
    : styles.backgroundOverlaySolid;

export const getOverlayStyle = ({
  overlayColor,
  overlayTone = "light",
  overlayStrength = "high",
}: Pick<
  HeroSectionProps,
  "overlayColor" | "overlayTone" | "overlayStrength"
>): CSSProperties => {
  const overlayAlpha = overlayAlphaMap[overlayStrength];
  const parsedOverlayColor = overlayColor ? parseHexColor(overlayColor) : null;
  const baseOverlayColor =
    parsedOverlayColor ??
    (overlayTone === "light"
      ? { r: 255, g: 255, b: 255, a: 1 }
      : { r: 0, g: 0, b: 0, a: 1 });

  return {
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
};

export const getHeroSectionStyle = ({
  bottomRadius = DEFAULT_BOTTOM_RADIUS,
  ...overlayProps
}: Pick<
  HeroSectionProps,
  "overlayColor" | "overlayTone" | "overlayStrength" | "bottomRadius"
>): CSSProperties =>
  ({
    "--radius-hero-bottom": bottomRadius === null ? 0 : `${bottomRadius}px`,
    ...getOverlayStyle(overlayProps),
  }) as CSSProperties;
