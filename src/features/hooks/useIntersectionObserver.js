import { useEffect, useState } from "react";

function useIntersectionObserver(element, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting),
    );

    observer.observe(element, options);

    return () => observer.disconnect();
  }, [element, options]);

  return isIntersecting;
}

export default useIntersectionObserver;
