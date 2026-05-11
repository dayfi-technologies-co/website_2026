import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Iphone17Pro,
  IPHONE_17_PRO_DESIGN_H,
  IPHONE_17_PRO_DESIGN_W,
} from "@/components/eldoraui/iphone-17-pro";
import appStoreBadge from "@/assets/pngs/coming_soon_to_the_app_store.png";
import googlePlayBadge from "@/assets/pngs/coming_soon_on_google_play.png";

const SPLASH_VIDEO_SRC = "/vid/splash_vid.mp4";
const SPLASH_POSTER_SRC = "/vid/splash_poster.jpg";

const socialLinks = {
  instagram: "https://www.instagram.com/usedayfi/",
  twitter: "https://x.com/usedayfi",
} as const;

// Target phone at full desktop: uniform scale of Pro logical size (390×844)
const PHONE_DISPLAY_SCALE = 0.875;
const PHONE_W_BASE = IPHONE_17_PRO_DESIGN_W * PHONE_DISPLAY_SCALE;
const PHONE_H_BASE = IPHONE_17_PRO_DESIGN_H * PHONE_DISPLAY_SCALE;
const PHONE_ASPECT = IPHONE_17_PRO_DESIGN_H / IPHONE_17_PRO_DESIGN_W;

// Desktop threshold — matches xl: (1280px). Keeping it in sync with Tailwind breakpoint.
const DESKTOP_BP = 1280;

function getPhoneDimensions(): { w: number; h: number } {
  if (typeof window === "undefined") return { w: PHONE_W_BASE, h: PHONE_H_BASE };
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Full desktop 3-col layout
  if (vw >= DESKTOP_BP) return { w: PHONE_W_BASE, h: PHONE_H_BASE };

  // Tablet / intermediate (768–1279px): phone gets most of the viewport height
  if (vw >= 768) {
    // Give the phone up to 78% of viewport height, constrained by width
    const maxH = vh * 0.78;
    const maxW = Math.min(PHONE_W_BASE, vw * 0.52);
    let h = Math.min(maxH, maxW * PHONE_ASPECT);
    let w = h / PHONE_ASPECT;
    return { w: Math.round(w), h: Math.round(h) };
  }

  // Mobile (<768px): full-width phone, generous height
  const horizontalPad = 24;
  let w = Math.min(PHONE_W_BASE, vw - horizontalPad);
  let h = w * PHONE_ASPECT;
  const maxH = vh * 0.62;
  if (h > maxH) {
    h = maxH;
    w = h / PHONE_ASPECT;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

/* ─── Background orbs (slow, small drift — easy on the eyes) ─── */
const BackgroundOrbs: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div
      className="landing-bg-orb absolute rounded-full"
      style={{
        width: "72vw", height: "72vw", top: "-18vw", left: "-20vw",
        background: "radial-gradient(circle, rgba(125,207,17,0.13) 0%, rgba(27,77,62,0.18) 45%, transparent 70%)",
        animation: "landingOrbDrift1 36s ease-in-out infinite",
      }}
    />
    <div
      className="landing-bg-orb absolute rounded-full"
      style={{
        width: "50vw", height: "50vw", bottom: "0", right: "-12vw",
        background: "radial-gradient(circle, rgba(125,207,17,0.10) 0%, rgba(14,31,25,0.05) 60%, transparent 80%)",
        animation: "landingOrbDrift2 44s ease-in-out infinite",
      }}
    />
    <div
      className="landing-bg-orb absolute rounded-full"
      style={{
        width: "38vw", height: "38vw", top: "40%", left: "35%",
        background: "radial-gradient(circle, rgba(27,77,62,0.22) 0%, transparent 70%)",
        animation: "landingOrbDrift3 52s ease-in-out infinite",
      }}
    />
    <style>{`
      @keyframes landingOrbDrift1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(1.2vw, 1.4vw) scale(1.012); }
      }
      @keyframes landingOrbDrift2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-1vw, -1.1vw) scale(1.015); }
      }
      @keyframes landingOrbDrift3 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-1.4vw, -0.9vw); }
      }
      @media (prefers-reduced-motion: reduce) {
        .landing-bg-orb { animation: none !important; }
      }
    `}</style>
  </div>
);

/* ─── Noise texture overlay ─── */
const NoiseOverlay: React.FC = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.032]"
    aria-hidden
    style={{ mixBlendMode: "screen" }}
  >
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

/* ─── Store badges ─── */
const StoreBadges: React.FC<{ variant: "desktop" | "mobile-stack" | "mobile-row" }> = ({ variant }) => {
  if (variant === "desktop") {
    return (
      <div className="flex w-full flex-row items-center justify-start gap-2 pt-3 sm:pt-6">
        <img src={appStoreBadge} alt="Coming soon to the App Store" className="w-full max-w-[124px]" />
        <img src={googlePlayBadge} alt="Coming soon on Google Play" className="w-full max-w-[124px]" />
      </div>
    );
  }
  if (variant === "mobile-stack") {
    return (
      <div className="flex flex-row items-center justify-center gap-2 pt-1">
        <img src={appStoreBadge} alt="Coming soon to the App Store" className="w-full max-w-[96px]" />
        <img src={googlePlayBadge} alt="Coming soon on Google Play" className="w-full max-w-[96px]" />
      </div>
    );
  }
  // mobile-row (tablet)
  return (
    <div className="flex flex-row items-center justify-center gap-2 pt-2">
      <img src={appStoreBadge} alt="Coming soon to the App Store" className="w-full max-w-[130px]" />
      <img src={googlePlayBadge} alt="Coming soon on Google Play" className="w-full max-w-[130px]" />
    </div>
  );
};

/* ─── Social icon ─── */
const SocialIcon: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({
  href, label, children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="rounded-lg p-2 text-white/40 transition-all duration-150 hover:bg-white/6 hover:text-white/95"
  >
    {children}
  </a>
);

/* ════════════════════════════════════════════════════
   LANDING PAGE
════════════════════════════════════════════════════ */
const LandingPage: React.FC = () => {
  const [phoneDims, setPhoneDims] = useState(getPhoneDimensions);
  const [mounted, setMounted] = useState(false);
  const splashVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onResize = () => setPhoneDims(getPhoneDimensions());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setMounted(true);
      return;
    }
    const t = window.setTimeout(() => setMounted(true), 48);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prev) document.documentElement.setAttribute("data-theme", prev);
      else document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  useEffect(() => {
    const el = splashVideoRef.current;
    if (!el) return;
    el.setAttribute("fetchpriority", "high");
    const tryPlay = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, []);

  const fadeEase = "cubic-bezier(0.22, 1, 0.36, 1)";
  const fadeUp = (delayMs: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(8px)",
    transition: `opacity 0.48s ${fadeEase} ${delayMs}ms, transform 0.48s ${fadeEase} ${delayMs}ms`,
  });

  const legalNavItems = [
    { to: "/terms", label: "Terms" },
    { to: "/privacy", label: "Privacy" },
    { to: "/about", label: "About" },
    { to: "/security", label: "Security" },
    { to: "/government", label: "Government" },
  ] as const;

  // Phone node — shared between layouts (fade applied by parent where needed)
  const phoneNode = (
    <div className="flex w-full shrink-0 justify-center xl:w-auto xl:shrink-0">
      <Iphone17Pro
        width={phoneDims.w}
        height={phoneDims.h}
        className="mx-auto shrink-0"
      >
        <video
          ref={splashVideoRef}
          autoPlay loop muted playsInline
          preload="metadata"
          poster={SPLASH_POSTER_SRC}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src={SPLASH_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/45 to-black/80" />

        <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-8 font-body text-white sm:px-7 sm:pb-7 sm:pt-9">
          <div className="shrink-0" aria-hidden />

          <div className="flex flex-1 flex-col items-center justify-center pb-2 xl:items-start">
            <h1
              className="max-w-[320px] text-center font-normal leading-[1.05] tracking-[-0.038em] text-white/95 xl:text-left"
              style={{ fontSize: "clamp(38px, 10vw, 66px)" }}
            >
              One point of sale, wherever you grow
            </h1>
          </div>

          <div className="shrink-0 space-y-2.5">
            <button
              type="button"
              className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-full font-semibold tracking-[-0.01em] text-black transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #9ae832 0%, #7DCF11 60%, #5ca80a 100%)",
                fontSize: "clamp(11px, 3vw, 13px)",
              }}
            >
              <span className="relative z-10">Create account</span>
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: "rgba(255,255,255,0.12)" }}
                aria-hidden
              />
            </button>
            <button
              type="button"
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-black/85 text-[12px] font-medium tracking-[-0.01em] text-white transition hover:bg-black/75"
            >
              Sign in
            </button>
          </div>
        </div>
      </Iphone17Pro>
    </div>
  );

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-[100dvh] flex-col overflow-y-auto outline-none xl:h-[100dvh] xl:max-h-[100dvh] xl:min-h-0 xl:overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(125,207,17,0.18) 0%, #132b20 28%, #0a1910 55%, #060f0b 100%)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <BackgroundOrbs />
      <NoiseOverlay />

      <section className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-start overflow-x-hidden px-4 py-6 sm:px-6 md:px-10 xl:justify-center xl:overflow-hidden xl:px-16 xl:py-2">
        <div className="flex w-full max-w-[1380px] flex-col items-center justify-center gap-6 xl:min-h-0 xl:flex-row xl:items-center xl:justify-between xl:gap-8">

          {/* ── LEFT PANEL: desktop (xl+) only ── */}
          <div
            className="hidden w-[280px] shrink-0 flex-col items-start xl:flex"
            style={fadeUp(0)}
          >
            <img
              src="/img/hero_logo.png"
              alt="DayFi"
              className="mb-0 h-44 w-44 self-start object-contain object-left"
            />
            <div className="font-body mt-8 w-full text-[18px] leading-snug text-white/95 md:text-[22px]">
              <p>A POS ready for what<br />you've got.</p>
            </div>
            <StoreBadges variant="desktop" />
          </div>

          {/* ── TABLET (768–1279px): logo + tagline above phone, badges below ── */}
          {/* This block only shows on md–lg, hidden on mobile and xl */}
          <div
            className="hidden w-full flex-col items-center gap-4 md:flex xl:hidden"
            style={fadeUp(0)}
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src="/img/hero_logo.png"
                alt="DayFi"
                className="h-20 w-20 object-contain"
              />
              <div className="font-body text-center text-[16px] leading-snug text-white/80">
                A POS ready for what you've got.
              </div>
            </div>

            {/* Phone in the middle */}
            <div style={fadeUp(56)}>{phoneNode}</div>

            <StoreBadges variant="mobile-row" />
          </div>

          {/* ── MOBILE (<768px): logo + tagline only ── */}
          <div
            className="flex w-full max-w-md flex-col items-center gap-2 text-center md:hidden"
            style={fadeUp(0)}
          >
            <img
              src="/img/hero_logo.png"
              alt="DayFi"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
            <div className="font-body text-[14px] leading-snug text-white/80 sm:text-[16px]">
              A POS ready for what you've got.
            </div>
          </div>

          {/* Phone on mobile (outside the tablet block above) */}
          <div className="flex w-full justify-center md:hidden" style={fadeUp(72)}>
            <Iphone17Pro
              width={phoneDims.w}
              height={phoneDims.h}
              className="mx-auto shrink-0"
            >
              <video
                ref={splashVideoRef}
                autoPlay loop muted playsInline
                preload="metadata"
                poster={SPLASH_POSTER_SRC}
                className="absolute inset-0 z-0 h-full w-full object-cover"
              >
                <source src={SPLASH_VIDEO_SRC} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/45 to-black/80" />
              <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-8 font-body text-white sm:px-7 sm:pb-7 sm:pt-9">
                <div className="shrink-0" aria-hidden />
                <div className="flex flex-1 flex-col items-center justify-center pb-2">
                  <h1
                    className="max-w-[320px] text-center font-normal leading-[1.05] tracking-[-0.038em] text-white/95"
                    style={{ fontSize: "clamp(38px, 10vw, 66px)" }}
                  >
                    One point of sale, wherever you grow
                  </h1>
                </div>
                <div className="shrink-0 space-y-2.5">
                  <button
                    type="button"
                    className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-full font-semibold tracking-[-0.01em] text-black transition-all duration-200 active:scale-[0.98]"
                    style={{ background: "linear-gradient(135deg, #9ae832 0%, #7DCF11 60%, #5ca80a 100%)", fontSize: "13px" }}
                  >
                    <span className="relative z-10">Create account</span>
                  </button>
                  <button
                    type="button"
                    className="flex h-[52px] w-full items-center justify-center rounded-full bg-black/85 text-[12px] font-medium tracking-[-0.01em] text-white transition hover:bg-black/75"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </Iphone17Pro>
          </div>

          {/* Desktop phone — xl+ only */}
          <div className="hidden xl:block" style={fadeUp(72)}>
            {phoneNode}
          </div>

          {/* ── RIGHT PANEL: desktop (xl+) only ── */}
          <div
            className="hidden w-[280px] shrink-0 flex-col items-end gap-8 xl:flex"
            style={fadeUp(36)}
          >
            <nav className="flex flex-col items-end gap-5" aria-label="Legal and policies">
              {legalNavItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[20px] font-medium leading-snug text-white/35 transition-colors duration-200 hover:text-white/95"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-0.5">
              <SocialIcon href={socialLinks.instagram} label="Instagram">
                <Instagram className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              </SocialIcon>
              <SocialIcon href={socialLinks.twitter} label="Twitter / X">
                <Twitter className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              </SocialIcon>
            </div>
          </div>

          {/* ── MOBILE: badges + legal + social (below phone, <md) ── */}
          <div className="flex w-full max-w-md flex-col items-center gap-5 pb-6 md:hidden">
            <StoreBadges variant="mobile-stack" />
            <nav className="flex flex-col items-center gap-3.5 font-body" aria-label="Legal and policies">
              {legalNavItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[15px] text-white/45 transition-colors hover:text-white/85"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-0.5">
              <SocialIcon href={socialLinks.instagram} label="Instagram">
                <Instagram className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              </SocialIcon>
              <SocialIcon href={socialLinks.twitter} label="Twitter / X">
                <Twitter className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              </SocialIcon>
            </div>
          </div>

          {/* ── TABLET: legal + social (below phone, md–xl) ── */}
          <div className="hidden w-full flex-col items-center gap-5 pb-4 md:flex xl:hidden">
            <nav className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body" aria-label="Legal and policies">
              {legalNavItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[14px] text-white/40 transition-colors hover:text-white/85"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-0.5">
              <SocialIcon href={socialLinks.instagram} label="Instagram">
                <Instagram className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              </SocialIcon>
              <SocialIcon href={socialLinks.twitter} label="Twitter / X">
                <Twitter className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              </SocialIcon>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;