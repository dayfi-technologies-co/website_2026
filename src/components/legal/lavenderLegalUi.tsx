import React from "react";

export type LavenderLegalSection = {
  title: string;
  content: string[];
};

type LavenderLegalHeroProps = {
  title: string;
  tagline: string;
  effectiveDateLine: string;
};

/**
 * DayFi Legal Hero
 * The old "lavender" naming is preserved for import compatibility.
 */
/** Monochrome deep green — one hue, light→dark stops only (no lime band). */
const LEGAL_HERO_DEEP_GREEN_GRADIENT =
  "linear-gradient(155deg, #1a3d2f 0%, #0d2018 42%, #060f0b 100%)";

export const LavenderLegalHero: React.FC<LavenderLegalHeroProps> = ({
  title,
  tagline,
  effectiveDateLine,
}) => (
  <div>
    <div
      className="relative flex justify-center overflow-hidden rounded-2xl px-6 py-10 sm:rounded-3xl sm:px-10 sm:py-14 lg:rounded-[40px] lg:py-20"
      style={{ background: LEGAL_HERO_DEEP_GREEN_GRADIENT }}
      role="presentation"
    >
      <div className="relative flex max-w-[600px] flex-col items-center text-center">
        <h1 className="font-body text-[clamp(2rem,6vw,3.25rem)] font-light leading-[1.1] tracking-[-0.035em] text-white/95">
          {title}
        </h1>

        <p className="font-body mt-5 max-w-[480px] text-[15px] font-normal leading-[26px] text-white/50">
          {tagline}
        </p>

        <p
          className="font-body mt-4 text-[12px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "rgba(125,207,17,0.55)" }}
        >
          {effectiveDateLine}
        </p>
      </div>
    </div>
  </div>
);

export const LavenderSectionCards: React.FC<{
  sections: LavenderLegalSection[];
}> = ({ sections }) => (
  <div className="mt-8 flex flex-col gap-px">
    {sections.map((section, i) => (
      <div
        key={section.title}
        className="group relative overflow-hidden border-b border-black/10 bg-white px-7 py-7 transition-colors duration-200 last:border-b-0 sm:px-8 sm:py-8"
      >
        {/* Hover left accent bar */}
        {/* <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-bottom scale-y-0 rounded-r-full transition-transform duration-300 group-hover:scale-y-100"
          style={{ background: "linear-gradient(to bottom, #7DCF11, rgba(125,207,17,0.2))" }}
          aria-hidden
        /> */}

        {/* Section number + title */}
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-body shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/50">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h2 className="font-body text-[17px] font-medium leading-snug text-black">
            {section.title.replace(/^\d+\.\s*/, "")}
          </h2>
        </div>

        <div className="flex flex-col gap-3 pl-9">
          {section.content.map((paragraph, pIndex) => (
            <p
              key={`${section.title}-${pIndex}`}
              className="font-body text-[15px] font-normal leading-[27px] text-black"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
);