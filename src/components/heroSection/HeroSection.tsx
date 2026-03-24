import Link from "next/link";
import { StrapiImage } from "@/components/strapiImage/StrapiImage";
import styles from "@/components/heroSection/HeroSection.module.css";
import type { HeroSectionProps } from "@/components/heroSection/HeroSection.types";
import {
  getHeroSectionStyle,
  getOverlayVariantClass,
  getTextToneClasses,
  getThemeClasses,
} from "@/components/heroSection/HeroSection.utils";

export const HeroSection = ({
  theme,
  heading,
  description,
  cta,
  image,
  logo,
  author,
  publishedAt,
  contentLayout = "center",
  overlayTone = "light",
  overlayColor = null,
  overlayStrength = "high",
  hasOverlayGradient = true,
  textTone = "primary",
  bottomRadius = 150,
}: Readonly<HeroSectionProps>) => {
  const isCenteredContent = contentLayout === "center";
  const themeClasses = getThemeClasses(theme);
  const textToneClasses = getTextToneClasses(textTone);
  const overlayVariantClass = getOverlayVariantClass(hasOverlayGradient);
  const heroSectionStyle = getHeroSectionStyle({
    overlayColor,
    overlayTone,
    overlayStrength,
    bottomRadius,
  });

  return (
    <section
      className="relative isolate mb-[125px] min-h-[830px] w-full pt-[220px]"
      style={heroSectionStyle}
    >
      <div className={`absolute inset-0 z-0 ${styles.background}`}>
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          className={`h-full w-full object-cover object-center object-bottom ${styles.backgroundImage}`}
          fill
        />
        <div
          className={`${styles.backgroundOverlay} ${overlayVariantClass}`}
        ></div>
      </div>
      <div
        className={`relative z-10 mx-auto w-full max-w-[1200px] px-[48px] ${
          isCenteredContent ? "flex justify-center text-center" : ""
        }`}
      >
        <div
          className={`flex flex-col ${
            isCenteredContent ? "items-center" : "items-start"
          }`}
        >
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
