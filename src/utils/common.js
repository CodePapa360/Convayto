export function scrollToBottom(ref) {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}
