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

export const HeroSection = ({
  theme,
  heading,
  description,
  cta,
  image,
  logo,
  author,
  publishedAt,
  darken = false,
  textTone = "inverse",
}: Readonly<HeroSectionProps>) => {
  const resolvedTheme = theme === "turquoise" ? "turquoise" : "orange";
  const themeClasses = themeClassMap[resolvedTheme];
  const textToneClasses = textToneClassMap[textTone];

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
        {darken && (
          <div className={`absolute inset-0 ${styles.backgroundOverlay}`}></div>
        )}
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
