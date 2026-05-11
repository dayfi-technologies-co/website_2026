import React from "react";
import { X } from "lucide-react";
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
  /** Merged onto the outer page wrapper (e.g. `bg-white`). */
  shellClassName?: string;
  children: React.ReactNode;
};

export const LegalDocsLayout: React.FC<LegalDocsLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  customHeader,
  shellClassName = "",
  children,
}) => (
  <div
    className={["min-h-screen bg-white text-black", shellClassName].filter(Boolean).join(" ")}
  >
    <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between gap-4 pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 no-underline"
          aria-label="DayFi home"
        >
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
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/65 no-underline transition-colors hover:bg-black/[0.06] hover:text-black"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
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
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-black/50">
                General
              </p>
              {title ? (
                <h1 className="mt-2 font-body text-[clamp(1.85rem,5vw,2.75rem)] font-light leading-[1.12] tracking-[-0.03em] text-black">
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p className="font-body mt-4 text-[16px] leading-relaxed text-black/70 sm:text-[17px]">
                  {subtitle}
                </p>
              ) : null}
              {(lastUpdated || effectiveDate) && (
                <div className="font-body mt-6 space-y-1 text-[13px] text-black/55">
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

        {/* Sidebar nav: "General" stays at top; link list scrolls independently */}
        <aside className="shrink-0 lg:w-[220px] xl:w-[240px]">
          <div className="flex flex-col lg:sticky lg:top-10 lg:max-h-[calc(100dvh-5rem)]">
            <p className="shrink-0 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
              General
            </p>
            <nav
              className="font-body mt-4 flex flex-col gap-3 lg:min-h-0 lg:max-h-[min(22rem,calc(100dvh-8rem))] lg:flex-1 lg:overflow-y-auto lg:overscroll-y-contain lg:pr-1"
              aria-label="Legal documents"
            >
              {LEGAL_GENERAL_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    [
                      "block w-full text-left text-[14px] leading-snug no-underline transition-colors duration-150",
                      isActive
                        ? "font-medium text-black"
                        : "text-black/40 hover:text-black/75",
                    ].join(" ")
                  }
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