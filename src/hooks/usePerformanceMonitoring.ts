
import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  interactionTime: number;
  memoryUsage?: number;
}

export const usePerformanceMonitoring = (componentName: string) => {
  const renderStartTime = useRef<number>();
  const interactionStartTime = useRef<number>();

  // Track render performance
  const trackRenderStart = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const trackRenderEnd = useCallback(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      console.log(`[Performance] ${componentName} render time: ${renderTime.toFixed(2)}ms`);
      
      // Report to analytics service in production
      if (renderTime > 16) { // 60fps threshold
        console.warn(`[Performance] Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }
  }, [componentName]);

  // Track user interactions
  const trackInteractionStart = useCallback(() => {
    interactionStartTime.current = performance.now();
  }, []);

  const trackInteractionEnd = useCallback((action: string) => {
    if (interactionStartTime.current) {
      const interactionTime = performance.now() - interactionStartTime.current;
      console.log(`[Performance] ${componentName} ${action} interaction: ${interactionTime.toFixed(2)}ms`);
      
      if (interactionTime > 100) { // 100ms threshold for interactions
        console.warn(`[Performance] Slow interaction in ${componentName}: ${action} took ${interactionTime.toFixed(2)}ms`);
      }
    }
  }, [componentName]);

  // Monitor memory usage
  useEffect(() => {
    const interval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn(`[Performance] High memory usage detected: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    trackRenderStart,
    trackRenderEnd,
    trackInteractionStart,
    trackInteractionEnd,
  };
};

export default usePerformanceMonitoring;
