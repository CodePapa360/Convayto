import { useEffect, useState } from "react";

function useIntersectionObserver(element) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting),
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return isIntersecting;
}

export default useIntersectionObserver;
