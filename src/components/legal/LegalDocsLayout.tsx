import React from "react";
import { Link, NavLink } from "react-router-dom";

export const LEGAL_GENERAL_NAV = [
  { to: "/terms", label: "Terms of Service" },
  { to: "/privacy", label: "Privacy Notice" },
  { to: "/about", label: "About DayFi" },
  { to: "/security", label: "Security" },
  { to: "/government", label: "Government" },
] as const;

export type LegalDocsLayoutProps = {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  /** Replaces the default "General" + title block (e.g. marketing hero). */
  customHeader?: React.ReactNode;
  /** Applied to the outer page wrapper — ignored in the dark shell but kept for API compat. */
  shellClassName?: string;
  children: React.ReactNode;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "font-body text-left text-[14px] leading-snug transition-colors duration-150",
    isActive
      ? "font-medium"
      : "hover:opacity-100",
  ].join(" ");

export const LegalDocsLayout: React.FC<LegalDocsLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  customHeader,
  children,
}) => (
  <div
    className="min-h-screen"
    style={{
      background:
        "linear-gradient(160deg, rgba(125,207,17,0.07) 0%, #0d2018 18%, #080f0a 50%, #050c07 100%)",
      color: "rgba(255,255,255,0.88)",
    }}
  >
    {/* Subtle noise texture matching landing */}
    <svg
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.025]"
      aria-hidden
      style={{ mixBlendMode: "screen", zIndex: 0 }}
    >
      <filter id="shell-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#shell-noise)" />
    </svg>

    <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      {/* Top bar */}
      <div
        className="mb-10 flex items-center justify-between gap-4 pb-6"
        style={{ borderBottom: "1px solid rgba(125,207,17,0.1)" }}
      >
        <Link to="/" className="inline-flex items-center gap-2" aria-label="DayFi home">
          <img
            src="/img/hero_logo.png"
            alt="DayFi"
            className="h-0 w-0 object-contain opacity-90"
            width={44}
            height={44}
          />
        </Link>
        <Link
          to="/"
          className="font-body text-[13px] transition-colors duration-150"
          style={{ color: "rgba(125,207,17,0.65)" }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "rgba(125,207,17,1)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "rgba(125,207,17,0.65)")
          }
        >
          ← Home
        </Link>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
        {/* Main content */}
        <main className="min-w-0 flex-1 lg:max-w-[min(100%,800px)]">
          {customHeader ? (
            <>
              {customHeader}
              <div className="mt-2">{children}</div>
            </>
          ) : (
            <>
              <p
                className="font-body text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "rgba(125,207,17,0.5)" }}
              >
                General
              </p>
              {title ? (
                <h1
                  className="mt-2 font-body text-[clamp(1.85rem,5vw,2.75rem)] font-light leading-[1.12] tracking-[-0.03em]"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p
                  className="font-body mt-4 text-[16px] leading-relaxed sm:text-[17px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {subtitle}
                </p>
              ) : null}
              {(lastUpdated || effectiveDate) && (
                <div
                  className="font-body mt-6 space-y-1 text-[13px]"
                  style={{ color: "rgba(125,207,17,0.55)" }}
                >
                  {lastUpdated && (
                    <p>Last updated: {lastUpdated}</p>
                  )}
                  {effectiveDate && (
                    <p>Effective date: {effectiveDate}</p>
                  )}
                </div>
              )}
              <div className="mt-10">{children}</div>
            </>
          )}
        </main>

        {/* Sidebar nav */}
        <aside className="shrink-0 lg:w-[220px] xl:w-[240px]">
          <div className="lg:sticky lg:top-10">
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgba(125,207,17,0.4)" }}
            >
              General
            </p>
            <nav
              className="font-body mt-4 flex flex-col gap-3 pt-4"
              style={{ borderTop: "1px solid rgba(125,207,17,0.12)" }}
              aria-label="Legal documents"
            >
              {LEGAL_GENERAL_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    [
                      "font-body text-left text-[14px] leading-snug transition-colors duration-150",
                      isActive
                        ? "font-medium"
                        : "",
                    ].join(" ")
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? "#7DCF11"
                      : "rgba(255,255,255,0.35)",
                  })}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (!el.classList.contains("font-medium"))
                      el.style.color = "rgba(255,255,255,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (!el.classList.contains("font-medium"))
                      el.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </div>
);