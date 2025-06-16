import { useState, useEffect } from "react";
import { APP_CONFIG } from "@/lib/constants";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < APP_CONFIG.MOBILE_BREAKPOINT);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(
        window.innerWidth >= APP_CONFIG.MOBILE_BREAKPOINT && 
        window.innerWidth < APP_CONFIG.DESKTOP_BREAKPOINT
      );
    };
    
    // Initial check
    checkTablet();
    
    // Add event listener
    window.addEventListener("resize", checkTablet);
    
    // Clean up
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return isTablet;
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= APP_CONFIG.DESKTOP_BREAKPOINT);
    };
    
    // Initial check
    checkDesktop();
    
    // Add event listener
    window.addEventListener("resize", checkDesktop);
    
    // Clean up
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return isDesktop;
}

export function useOrientation() {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    // Initial check
    checkOrientation();
    
    // Add event listener
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return { isPortrait, isLandscape: !isPortrait };
}

export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Initial size
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}