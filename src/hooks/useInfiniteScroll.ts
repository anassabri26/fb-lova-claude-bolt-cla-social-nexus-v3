
import { useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 100
}: UseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, {
      rootMargin: `${threshold}px`
    });
    
    if (node) observer.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, threshold]);

  return { lastElementRef };
};

export default useInfiniteScroll;
