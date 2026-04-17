import { useEffect, useState } from "react";

type ScreenSize = {
  isPhone: boolean;
  isTabletUp: boolean;
  isNotebookUp: boolean;
  isDesktopUp: boolean;
  isLargeDesktopUp: boolean;
};

const queries = {
  phone: "(max-width: 76.7rem)",
  tabletUp: "(min-width: 76.8rem)",
  notebookUp: "(min-width: 102.4rem)",
  desktopUp: "(min-width: 136.6rem)",
  largeDesktopUp: "(min-width: 192rem)",
};

export const useScreenSize = (): ScreenSize => {
  const [screen, setScreen] = useState<ScreenSize>({
    isPhone: false,
    isTabletUp: false,
    isNotebookUp: false,
    isDesktopUp: false,
    isLargeDesktopUp: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueries = {
      phone: window.matchMedia(queries.phone),
      tabletUp: window.matchMedia(queries.tabletUp),
      notebookUp: window.matchMedia(queries.notebookUp),
      desktopUp: window.matchMedia(queries.desktopUp),
      largeDesktopUp: window.matchMedia(queries.largeDesktopUp),
    };

    const update = () => {
      setScreen({
        isPhone: mediaQueries.phone.matches,
        isTabletUp: mediaQueries.tabletUp.matches,
        isNotebookUp: mediaQueries.notebookUp.matches,
        isDesktopUp: mediaQueries.desktopUp.matches,
        isLargeDesktopUp: mediaQueries.largeDesktopUp.matches,
      });
    };

    update();

    Object.values(mediaQueries).forEach((mq) => mq.addEventListener("change", update));

    return () => {
      Object.values(mediaQueries).forEach((mq) =>
        mq.removeEventListener("change", update)
      );
    };
  }, []);

  return screen;
};
