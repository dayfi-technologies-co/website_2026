import React, { useEffect, useState } from "react";
import { Iphone17Pro } from "@/components/eldoraui/iphone-17-pro";
import appStoreBadge from "@/assets/pngs/coming_soon_to_the_app_store.png";
import googlePlayBadge from "@/assets/pngs/coming_soon_on_google_play.png";

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

  const maxH = vh * (vw < 640 ? 0.52 : vw < 1024 ? 0.58 : 0.62);
  if (h > maxH) {
    h = maxH;
    w = h / PHONE_ASPECT;
  }

  return { w, h };
}

const LandingPage: React.FC = () => {
  const [phoneDims, setPhoneDims] = useState(getPhoneDimensions);

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

  const storeBadgeRow = (
    <div className="flex w-full max-w-[320px] flex-row items-center justify-center gap-3 sm:gap-4">
      <img
        src={appStoreBadge}
        alt="Coming soon to the App Store"
        className="h-auto w-full max-w-[118px] sm:max-w-[134px]"
      />
      <img
        src={googlePlayBadge}
        alt="Coming soon on Google Play"
        className="h-auto w-full max-w-[118px] sm:max-w-[134px]"
      />
    </div>
  );

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen flex-col overflow-y-auto bg-zap-bg text-zap-ink outline-none xl:h-screen xl:overflow-hidden"
    >
      <section className="flex w-full flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-10 xl:px-20 xl:py-6">
        <div className="flex w-full max-w-[1380px] flex-col items-center gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
          <div className="hidden w-[320px] flex-col justify-center xl:flex">
            <img
              src="/img/hero_logo.png"
              alt=""
              className="mx-auto h-44 w-44 object-contain"
            />

            <p className="font-body mb-4 w-full text-center text-[16px] leading-snug text-zap-ink md:text-[20px]">
              Every day is payday
            </p>

            <p className="font-body mt-4 w-full text-center text-[18px] leading-snug text-zap-ink-muted md:text-[22px]">
              Sell in-person, online, or<br />on the go.
            </p>

          </div>

          <div className="flex w-full flex-col items-center gap-4 pt-2 xl:hidden">
            <img
              src="/img/hero_logo.png"
              alt=""
              className="mx-auto h-28 w-28 object-contain sm:h-36 sm:w-36"
            />
            <p className="font-body w-full max-w-md text-center text-[15px] leading-snug text-zap-ink sm:text-[17px] md:text-[18px]">
              Every day is payday
            </p>
            <p className="font-body w-full max-w-md text-center text-[16px] leading-snug text-zap-ink-muted sm:text-[17px] md:text-[19px]">
              Sell in-person, online, or<br />on the go.
            </p>
          </div>

          <Iphone17Pro
            width={phoneDims.w}
            height={phoneDims.h}
            className="mx-auto w-full max-w-full shrink-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/vid/splash_vid.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/80" />

            <div
              className="relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-8 text-white sm:px-7 sm:pb-7 sm:pt-9"
              style={{ fontFamily: "'Karla', sans-serif" }}
            >
              <div className="shrink-0" aria-hidden />

              <div className="flex flex-1 flex-col justify-center pb-2">
                <h1 className="max-w-[320px] text-[clamp(2.35rem,9.2vw,3.65rem)] font-light leading-[1.01] tracking-[-0.038em] text-white/95 sm:text-[52px] xl:text-[58px]">
                  One point of sale, wherever you grow
                </h1>
              </div>

              <div className="shrink-0 space-y-3">
                <button className="h-11 w-full rounded-full bg-white text-[11px] font-semibold tracking-[-0.01em] text-black transition hover:bg-white/90 sm:h-12 sm:text-[12px]">
                  Create account
                </button>
                <button className="h-11 w-full rounded-full bg-black/85 text-[11px] font-medium tracking-[-0.01em] text-white transition hover:bg-black/75 sm:h-12 sm:text-[12px]">
                  Sign in
                </button>
              </div>
            </div>
          </Iphone17Pro>

          <div className="hidden w-[320px] flex-col items-center justify-center gap-4 xl:flex">
            <div className="flex w-full flex-col items-center justify-center gap-3 pt-4">
              <img
                src={appStoreBadge}
                alt="Coming soon to the App Store"
                className="w-full max-w-[144px]"
              />
              <img
                src={googlePlayBadge}
                alt="Coming soon on Google Play"
                className="w-full max-w-[144px]"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center pb-4 pt-2 xl:hidden">
            {storeBadgeRow}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
