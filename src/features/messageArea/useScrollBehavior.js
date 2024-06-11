import { useEffect } from "react";

function useScrollBehavior({
  pages,
  bottomRef,
  lastPageBtm,
  isIntersectingTop,
  isIntersectingBtm,
}) {
  const scrollTo = (ref, behavior = "smooth") => {
    ref?.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (!pages || !pages[0]) return;

    if (isIntersectingBtm) return scrollTo(bottomRef);

    const lastPage = pages[pages.length - 1];
    const lastMessage = lastPage[lastPage.length - 1];

    if (lastMessage?.optimistic) return scrollTo(bottomRef);

    if (pages.length === 1) return scrollTo(bottomRef);

    if (lastPageBtm.current && isIntersectingTop)
      return scrollTo(lastPageBtm, "instant");
  }, [pages, bottomRef, lastPageBtm]);

  //pages, bottomRef, lastPageBtm
  //pages, bottomRef, lastPageBtm, isIntersectingTop, isIntersectingBtm
}

export default useScrollBehavior;
