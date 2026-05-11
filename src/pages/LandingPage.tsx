import React, { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Iphone17Pro } from "@/components/eldoraui/iphone-17-pro";
import appStoreBadge from "@/assets/pngs/coming_soon_to_the_app_store.png";
import googlePlayBadge from "@/assets/pngs/coming_soon_on_google_play.png";

const SPLASH_VIDEO_SRC = "/vid/splash_vid.mp4";

const socialLinks = {
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

const legalLinkClass =
  "block w-full text-center font-body text-[20px] leading-snug text-zap-ink-muted transition-colors duration-200 ease-out hover:text-white md:text-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zap-border-bright";

const socialIconClass =
  "rounded-md p-2 text-zap-ink-muted transition-colors duration-200 ease-out hover:bg-white/5 hover:text-zap-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zap-border-bright";

const PHONE_W = 370 * 0.95;
const PHONE_H = 780 * 0.95;
const PHONE_ASPECT = PHONE_H / PHONE_W;

function getPhoneDimensions(): { w: number; h: number } {
  if (typeof window === "undefined") {
    return { w: PHONE_W, h: PHONE_H };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw >= 1280) {
    return { w: PHONE_W, h: PHONE_H };
  }

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

const sellTagline = (
  <p>
    A POS ready for what
    <br />
    you've got.
  </p>
);

const StoreBadges: React.FC<{ variant: "hero-xl" | "hero-sm" }> = ({
  variant,
}) => {
  const imgClass =
    variant === "hero-xl" ? "w-full max-w-[124px]" : "w-full max-w-[114px]";

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 pt-3 sm:pt-6">
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

const LandingPage: React.FC = () => {
  const [phoneDims, setPhoneDims] = useState(getPhoneDimensions);
  const splashVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onResize = () => setPhoneDims(getPhoneDimensions());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const previousTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");

    return () => {
      if (previousTheme) {
        document.documentElement.setAttribute("data-theme", previousTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };
  }, []);

  useEffect(() => {
    const el = splashVideoRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-gradient-to-br from-[#7DCF11]/20 via-[#1B4D3E] to-[#0e1f19] text-zap-ink outline-none"
    >
      <section className="flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-1 sm:px-6 sm:py-2 md:px-10 md:py-2 xl:px-16 xl:py-3">
        <div className="flex min-h-0 w-full max-w-[1380px] flex-col items-center gap-2 overflow-y-hidden sm:gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
          <div className="hidden w-[320px] flex-col justify-center xl:flex">
            <img
              src="/img/hero_logo.png"
              alt=""
              className="mx-auto h-44 w-44 object-contain"
            />
            <div className="font-body mt-2 w-full text-center text-[18px] leading-snug text-white/95 md:text-[22px]">
              {sellTagline}
            </div>
            <StoreBadges variant="hero-xl" />
          </div>

          <div className="flex w-full shrink-0 flex-col items-center gap-2 pt-0 sm:gap-3 sm:pt-1 xl:hidden">
            <img
              src="/img/hero_logo.png"
              alt=""
              className="mx-auto h-28 w-28 object-contain sm:h-36 sm:w-36"
            />
            <div className="font-body w-full max-w-md text-center text-[16px] leading-snug text-zap-ink-muted sm:text-[17px] md:text-[19px]">
              {sellTagline}
            </div>
            <StoreBadges variant="hero-sm" />
          </div>

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
              preload="auto"
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

              <div className="shrink-0 space-y-3">
                <button
                  type="button"
                  className="h-[52px] w-full rounded-full bg-white text-[12px] font-semibold tracking-[-0.01em] text-black transition hover:bg-white/90 sm:text-[12px]"
                >
                  Create account
                </button>
                <button
                  type="button"
                  className="h-[52px] w-full rounded-full bg-black/85 text-[12px] font-medium tracking-[-0.01em] text-white transition hover:bg-black/75 sm:text-[12px]"
                >
                  Sign in
                </button>
              </div>
            </div>
          </Iphone17Pro>
          <div className="hidden w-[320px] shrink-0 flex-col items-center justify-center xl:flex">
            {/* <p className="font-body w-full text-center text-[16px] leading-snug text-zap-ink md:text-[20px]">
            Get up and running with a POS personalized for however you do business. 
            </p> */}

            <nav
              className="flex w-full min-w-0 flex-col items-center gap-y-8 pb-8 pt-12"
              aria-label="Legal and policies"
            >
              <Link to="/terms" className={legalLinkClass}>
                Terms
              </Link>
              <Link to="/privacy" className={legalLinkClass}>
                Privacy
              </Link>

              <Link to="/security" className={legalLinkClass}>
                Security
              </Link>
              {/* <Link to="/government" className={legalLinkClass}>
                Government
              </Link> */}
            </nav>

            <div
              className="flex items-center justify-center gap-0.5 sm:gap-2"
              aria-label="Social media"
            >
              {/* <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a> */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a>
              {/* <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="LinkedIn"
              > 
                <Linkedin className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a> */}
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto flex w-full min-w-0 max-w-[1380px] flex-col items-center gap-2 bg-transparent px-2 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-6 md:py-3 xl:px-10 xl:py-3">
        <p className="font-body text-center text-[11px] leading-relaxed text-white/50 sm:text-xs">
          © 2026 dayfi co
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
