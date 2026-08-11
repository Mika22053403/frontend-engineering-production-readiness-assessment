import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 639px)";

/**
 * Returns true when the viewport is narrower than Tailwind's `sm` breakpoint.
 *
 * Defaults to `false` (desktop) on the server, in environments without
 * `window.matchMedia` (e.g. jsdom in unit tests), and until the first
 * effect runs on the client - this intentionally avoids ever mounting
 * both the desktop and mobile variants of a component at once, which
 * would duplicate content in the DOM.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = window.matchMedia(MOBILE_BREAKPOINT_QUERY);

    const updateMatch = () => setIsMobile(mediaQueryList.matches);

    updateMatch();

    mediaQueryList.addEventListener("change", updateMatch);
    return () => mediaQueryList.removeEventListener("change", updateMatch);
  }, []);

  return isMobile;
}