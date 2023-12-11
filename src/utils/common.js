export function scrollToBottom(ref) {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

export function formatTime(rawTime) {
  if (!rawTime) return "-- : -- : --";

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
    new Date(rawTime)
  );
  return formattedTime.toLowerCase();
}
