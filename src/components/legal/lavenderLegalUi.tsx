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

/* ─── Noise texture overlay (matches landing) ─── */
const NoiseOverlay: React.FC = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.032]"
    aria-hidden
    style={{ mixBlendMode: "screen" }}
  >
    <filter id="legal-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.72"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#legal-noise)" />
  </svg>
);

/**
 * DayFi Legal Hero
 * Dark green/lime brand — matches the landing page palette.
 * The old "lavender" naming is preserved for import compatibility.
 */
export const LavenderLegalHero: React.FC<LavenderLegalHeroProps> = ({
  title,
  tagline,
  effectiveDateLine,
}) => (
  <div>
    {/* Hero banner */}
    <div
      className="relative flex justify-center overflow-hidden rounded-2xl px-6 py-10 sm:rounded-3xl sm:px-10 sm:py-14 lg:rounded-[40px] lg:py-20"
      style={{
        background:
          "linear-gradient(145deg, rgba(125,207,17,0.18) 0%, #132b20 35%, #0a1910 70%, #060f0b 100%)",
      }}
      role="presentation"
    >
      <NoiseOverlay />

      {/* Orbs — exact same style as landing BackgroundOrbs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "55%",
          height: "55%",
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(125,207,17,0.13) 0%, rgba(27,77,62,0.18) 45%, transparent 70%)",
          animation: "legalOrb1 18s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "40%",
          height: "40%",
          bottom: "-10%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(125,207,17,0.10) 0%, rgba(14,31,25,0.05) 60%, transparent 80%)",
          animation: "legalOrb2 22s ease-in-out infinite",
        }}
        aria-hidden
      />

      <style>{`
        @keyframes legalOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3%, 4%) scale(1.04); }
          66% { transform: translate(-2%, 2%) scale(0.97); }
        }
        @keyframes legalOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-4%, -3%) scale(1.06); }
          70% { transform: translate(2%, 4%) scale(0.96); }
        }
      `}</style>

      <div className="relative flex max-w-[600px] flex-col items-center text-center">
        {/* Lime eyebrow dot */}
        {/* <div
          className="mb-5 h-1.5 w-1.5 rounded-full"
          style={{ background: "#7DCF11" }}
          aria-hidden
        /> */}

        <h1
          className="font-body text-[clamp(2rem,6vw,3.25rem)] font-light leading-[1.1] tracking-[-0.035em] text-white/95"
        >
          {title}
        </h1>

        <p className="font-body mt-5 max-w-[480px] text-[15px] font-normal leading-[26px] text-white/50">
          {tagline}
        </p>

        {/* Thin lime rule */}
        {/* <div
          className="mt-8 h-px w-12 rounded-full"
          style={{ background: "rgba(125,207,17,0.4)" }}
          aria-hidden
        /> */}

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
        className="group relative overflow-hidden px-7 py-7 sm:px-8 sm:py-8 transition-colors duration-200"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderBottom:
            i < sections.length - 1
              ? "1px solid rgba(125,207,17,0.08)"
              : "none",
        }}
      >
        {/* Hover left accent bar */}
        {/* <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-bottom scale-y-0 rounded-r-full transition-transform duration-300 group-hover:scale-y-100"
          style={{ background: "linear-gradient(to bottom, #7DCF11, rgba(125,207,17,0.2))" }}
          aria-hidden
        /> */}

        {/* Section number + title */}
        <div className="mb-4 flex items-baseline gap-3">
          <span
            className="font-body shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "rgba(125,207,17,0.5)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h2
            className="font-body text-[17px] font-medium leading-snug"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {section.title.replace(/^\d+\.\s*/, "")}
          </h2>
        </div>

        <div className="flex flex-col gap-3 pl-9">
          {section.content.map((paragraph, pIndex) => (
            <p
              key={`${section.title}-${pIndex}`}
              className="font-body text-[15px] font-normal leading-[27px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
);