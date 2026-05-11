import React, { useEffect, useRef, useState } from "react";
import { Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Iphone17Pro } from "@/components/eldoraui/iphone-17-pro";
import appStoreBadge from "@/assets/pngs/coming_soon_to_the_app_store.png";
import googlePlayBadge from "@/assets/pngs/coming_soon_on_google_play.png";

const SPLASH_VIDEO_SRC = "/vid/splash_vid.mp4";
/** First frame; run `npm run video:splash` to generate alongside the mp4. */
const SPLASH_POSTER_SRC = "/vid/splash_poster.jpg";

const socialLinks = {
  instagram: "https://www.instagram.com/",
  twitter: "https://twitter.com/",
} as const;

const PHONE_W = 370 * 0.95;
const PHONE_H = 780 * 0.95;
const PHONE_ASPECT = PHONE_H / PHONE_W;

function getPhoneDimensions(): { w: number; h: number } {
  if (typeof window === "undefined") return { w: PHONE_W, h: PHONE_H };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw >= 1280) return { w: PHONE_W, h: PHONE_H };
  const horizontalPad = vw < 640 ? 24 : vw < 1024 ? 48 : 64;
  let w = Math.min(PHONE_W, vw - horizontalPad);
  let h = w * PHONE_ASPECT;
  const maxH = vh * (vw < 640 ? 0.64 : vw < 1024 ? 0.66 : 0.62);
  if (h > maxH) {
    h = maxH;
    w = h / PHONE_ASPECT;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

/* ─── Animated background orbs ─── */
const BackgroundOrbs: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden
  >
    {/* Primary deep green orb */}
    <div
      className="absolute rounded-full"
      style={{
        width: "72vw",
        height: "72vw",
        top: "-18vw",
        left: "-20vw",
        background:
          "radial-gradient(circle, rgba(125,207,17,0.13) 0%, rgba(27,77,62,0.18) 45%, transparent 70%)",
        animation: "orbDrift1 18s ease-in-out infinite",
      }}
    />
    {/* Accent lime orb */}
    <div
      className="absolute rounded-full"
      style={{
        width: "50vw",
        height: "50vw",
        bottom: "0",
        right: "-12vw",
        background:
          "radial-gradient(circle, rgba(125,207,17,0.10) 0%, rgba(14,31,25,0.05) 60%, transparent 80%)",
        animation: "orbDrift2 22s ease-in-out infinite",
      }}
    />
    {/* Subtle mid orb */}
    <div
      className="absolute rounded-full"
      style={{
        width: "38vw",
        height: "38vw",
        top: "40%",
        left: "35%",
        background:
          "radial-gradient(circle, rgba(27,77,62,0.22) 0%, transparent 70%)",
        animation: "orbDrift3 26s ease-in-out infinite",
      }}
    />
    <style>{`
      @keyframes orbDrift1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(3vw, 4vw) scale(1.04); }
        66% { transform: translate(-2vw, 2vw) scale(0.97); }
      }
      @keyframes orbDrift2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        40% { transform: translate(-4vw, -3vw) scale(1.06); }
        70% { transform: translate(2vw, 4vw) scale(0.96); }
      }
      @keyframes orbDrift3 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-6vw, -4vw); }
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
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.72"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

/* ─── Waitlist form ─── */
const WaitlistForm: React.FC<{ size?: "sm" | "lg" }> = ({ size = "lg" }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    setState("loading");
    setTimeout(() => setState("done"), 1200);
  };

  if (state === "done") {
    return (
      <div
        className="flex items-center justify-center gap-2 rounded-full bg-white/8 px-4 py-2"
        style={{ border: "1px solid rgba(125,207,17,0.35)" }}
      >
        <span className="text-[13px] font-medium" style={{ color: "#7DCF11" }}>
          ✓ You're on the list
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex w-full max-w-[300px] items-center overflow-hidden rounded-full bg-white/6 transition-all duration-200 focus-within:bg-white/10"
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        height: size === "lg" ? "44px" : "38px",
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="flex-1 bg-transparent px-4 text-[13px] text-white/80 placeholder-white/30 outline-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={state === "loading"}
        className="mr-1 rounded-full px-3 py-1 text-[12px] font-semibold transition-all duration-150"
        style={{
          background: state === "loading" ? "rgba(125,207,17,0.5)" : "#7DCF11",
          color: "#0b1a10",
          minWidth: "64px",
        }}
      >
        {state === "loading" ? "…" : "Notify me"}
      </button>
    </div>
  );
};

/* ─── Store badges ─── */
const StoreBadges: React.FC<{ variant: "hero-xl" | "hero-sm" }> = ({
  variant,
}) => {
  const imgClass =
    variant === "hero-xl" ? "w-full max-w-[124px]" : "w-full max-w-[114px]";
  const rowClass =
    variant === "hero-xl"
      ? "flex w-full flex-row items-center justify-start gap-2 pt-3 sm:pt-6"
      : "flex w-full flex-row items-center justify-center gap-2 pt-3 sm:pt-6";

  return (
    <div className={rowClass}>
      <img
        src={appStoreBadge}
        alt="Coming soon to the App Store"
        className={imgClass}
      />
      <img
        src={googlePlayBadge}
        alt="Coming soon on Google Play"
        className={imgClass}
      />
    </div>
  );
};

/* ─── Stat pill ─── */
const StatPill: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div
    className="flex items-center gap-2 rounded-full px-2 py-1"
    // style={{
    //   background: "rgba(255,255,255,0.06)",
    //   border: "1px solid rgba(255,255,255,0.1)",
    // }}
  >
    <span className="text-[12px] font-semibold text-white/90">{value}</span>
    <span className="text-[10px] text-white/40">{label}</span>
  </div>
);

/* ─── Social icon ─── */
const SocialIcon: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
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

/* ─── Divider dot ─── */
const Dot: React.FC = () => (
  <span className="text-white/20 select-none">·</span>
);

/* ════════════════════════════════════════════════════
   LANDING PAGE
════════════════════════════════════════════════════ */
const LandingPage: React.FC = () => {
  const [phoneDims, setPhoneDims] = useState(getPhoneDimensions);
  const [mounted, setMounted] = useState(false);
  const splashVideoRef = useRef<HTMLVideoElement>(null);

  /* resize */
  useEffect(() => {
    const onResize = () => setPhoneDims(getPhoneDimensions());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* mount animation trigger */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* force dark theme */
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prev) document.documentElement.setAttribute("data-theme", prev);
      else document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  /* autoplay video + hint high fetch priority (not in older React DOM typings) */
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

  const fadeUp = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  });

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden outline-none"
      style={{
        background:
          "linear-gradient(145deg, rgba(125,207,17,0.18) 0%, #132b20 28%, #0a1910 55%, #060f0b 100%)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <BackgroundOrbs />
      <NoiseOverlay />

      {/* ── TOP NAV BAR (mobile) ── */}
      <header
        className="relative z-20 flex items-center justify-between px-5 py-3 sm:px-7 xl:hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <img
          src="/img/hero_logo.png"
          alt="DayFi"
          className="h-8 w-8 object-contain"
        />
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 sm:gap-x-5">
          <Link
            to="/terms"
            className="text-[13px] text-white/40 transition-colors hover:text-white/70"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="text-[13px] text-white/40 transition-colors hover:text-white/70"
          >
            Privacy
          </Link>
          <Link
            to="/about"
            className="text-[13px] text-white/40 transition-colors hover:text-white/70"
          >
            About
          </Link>
          <Link
            to="/security"
            className="text-[13px] text-white/40 transition-colors hover:text-white/70"
          >
            Security
          </Link>
          <Link
            to="/government"
            className="text-[13px] text-white/40 transition-colors hover:text-white/70"
          >
            Government
          </Link>
        </nav>
      </header>

      {/* ── MAIN CONTENT ── */}
      <section className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-2 sm:px-6 md:px-10 xl:px-16">
        <div className="flex min-h-0 w-full max-w-[1380px] flex-col items-center gap-2 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
          {/* ── LEFT PANEL (desktop only) ── */}
          <div
            className="hidden w-[300px] shrink-0 flex-col items-start xl:flex"
            style={fadeUp(0)}
          >
            <img
              src="/img/hero_logo.png"
              alt="DayFi"
              className="mb-0 h-44 w-44 self-start object-contain object-left"
            />
            <div className="font-body mt-8 w-full text-[18px] leading-snug text-white/95 md:text-[22px]">
              <p>
                A POS ready for what
                <br />
                you've got.
              </p>
            </div>

            {/* Stats */}
            {/* <div className="mb-6 mt-6 flex flex-wrap gap-2">
              <StatPill value="0%" label="setup fee" />
              <StatPill value="NGN" label="local" />
              <StatPill value="USDC" label="stable" />
              <StatPill value="NFC" label="tap to pay" />
              <StatPill value="QR" label="scan to pay" />
              <StatPill value="Bank" label="bank integration" />
              <StatPill value="Inventory" label="inventory management" />
              <StatPill value="Analytics" label="analytics" />
              <StatPill value="Reports" label="reports" />
              <StatPill value="Settings" label="settings" />
            </div> */}

            {/* <WaitlistForm size="lg"  /> */}

            <StoreBadges variant="hero-xl" />
          </div>

          {/* ── MOBILE HEADER ── */}
          <div className="flex w-full shrink-0 flex-col items-center gap-2 pt-0 sm:gap-3 sm:pt-1 xl:hidden">
            <img
              src="/img/hero_logo.png"
              alt=""
              className="mx-auto h-28 w-28 object-contain sm:h-36 sm:w-36"
            />
            <div className="font-body w-full max-w-md text-center text-[16px] leading-snug text-zap-ink-muted sm:text-[17px] md:text-[19px]">
              <p>
                A POS ready for what
                <br />
                you've got.
              </p>
            </div>
            <StoreBadges variant="hero-sm" />
          </div>

          {/* ── PHONE ── */}
          <div style={fadeUp(120)}>
            <Iphone17Pro
              width={phoneDims.w}
              height={phoneDims.h}
              className="mx-auto shrink-0"
            >
              <video
                ref={splashVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={SPLASH_POSTER_SRC}
                className="absolute inset-0 z-0 h-full w-full object-cover"
              >
                <source src={SPLASH_VIDEO_SRC} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/45 to-black/80" />

              <div
                className="relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-8 text-white sm:px-7 sm:pb-7 sm:pt-9"
                style={{ fontFamily: "'Karla', sans-serif" }}
              >
                <div className="shrink-0" aria-hidden />

                <div className="flex flex-1 flex-col justify-center pb-2">
                  <h1 className="max-w-[320px] text-[clamp(2.35rem,9.2vw,3.65rem)] font-light leading-[1] tracking-[-0.038em] text-white/95 sm:text-[64px] xl:text-[66px]">
                    One point of sale, wherever you grow
                  </h1>
                </div>

                <div className="shrink-0 space-y-2.5">
                  <button
                    type="button"
                    className="group relative h-[50px] w-full overflow-hidden rounded-full font-semibold tracking-[-0.01em] text-black transition-all duration-200 active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(135deg, #9ae832 0%, #7DCF11 60%, #5ca80a 100%)",
                      fontSize: "clamp(11px, 3vw, 13px)",
                      // boxShadow: "0 4px 20px rgba(125,207,17,0.35)",
                    }}
                  >
                    <span className="relative z-10">Create account</span>
                    <span
                      className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    />
                  </button>
                  <button
                    type="button"
                    className="h-[50px] w-full rounded-full font-medium tracking-[-0.01em] text-white/85 transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      // border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: "clamp(11px, 3vw, 13px)",
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </Iphone17Pro>
          </div>

          {/* ── RIGHT PANEL (desktop only) ── */}
          <div
            className="hidden w-[300px] shrink-0 flex-col items-end gap-8 xl:flex"
            style={fadeUp(60)}
          >
            {/* legal nav */}
            <nav
              className="flex flex-col items-end gap-5"
              aria-label="Legal and policies"
            >
              {(
                ["Terms", "Privacy", "About", "Security", "Government"] as const
              ).map((label) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  className="text-[20px] font-light leading-snug text-white/35 transition-colors duration-200 hover:text-white/95"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* <p className="text-[11px] text-white/30">© 2026 DayFi Co.</p> */}

            {/* social */}
            <div className="flex items-center gap-0.5">
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

      {/* ── FOOTER (below xl only; desktop uses right rail) ── */}
      <footer
        className="relative z-10 flex w-full shrink-0 items-center justify-center gap-2 px-4 py-2.5 bg-transparent xl:hidden"
        // style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex w-full max-w-[1380px] flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] text-white/30">© 2026 DayFi Co.</p>
          <div className="flex items-center gap-3 text-[11px] text-white/25">
            <Link to="/terms" className="transition-colors hover:text-white/55">
              Terms
            </Link>
            <Dot />
            <Link
              to="/privacy"
              className="transition-colors hover:text-white/55"
            >
              Privacy
            </Link>
            <Dot />
            <Link to="/about" className="transition-colors hover:text-white/55">
              About
            </Link>
            <Dot />
            <Link
              to="/security"
              className="transition-colors hover:text-white/55"
            >
              Security
            </Link>
            <Dot />
            <Link
              to="/government"
              className="transition-colors hover:text-white/55"
            >
              Government
            </Link>
          </div>
          <div className="flex items-center gap-0.5">
            <SocialIcon href={socialLinks.instagram} label="Instagram">
              <Instagram className="h-4 w-4" strokeWidth={1.6} aria-hidden />
            </SocialIcon>
            <SocialIcon href={socialLinks.twitter} label="Twitter / X">
              <Twitter className="h-4 w-4" strokeWidth={1.6} aria-hidden />
            </SocialIcon>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
