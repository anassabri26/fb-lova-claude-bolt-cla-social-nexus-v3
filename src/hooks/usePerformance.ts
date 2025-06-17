import { useEffect, useRef } from 'react';
import { performanceMonitor } from '@/lib/utils';

export const usePerformance = (componentName: string) => {
  const mountTime = useRef<number>(Date.now());
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
    
    // Mark component mount
    performanceMonitor.mark(`${componentName}-mount-start`);
    
    return () => {
      // Mark component unmount
      performanceMonitor.mark(`${componentName}-mount-end`);
      
      const mountDuration = Date.now() - mountTime.current;
      
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log(`Performance [${componentName}]:`, {
          mountDuration,
          renderCount: renderCount.current,
        });
      }
    };
  }, [componentName]);

  const trackInteraction = (interactionName: string) => {
    const startTime = Date.now();
    
    return () => {
      const duration = Date.now() - startTime;
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log(`Interaction [${componentName}/${interactionName}]:`, duration);
      }
    };
  };

  return { trackInteraction };
};