export function scrollToBottom(ref) {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

export function formatTime(rawTime) {
  if (!rawTime) return "-- : -- --";

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

export function sortByTime(conv1, conv2) {
  if (!conv1?.lastMessage) return conv2;
  if (!conv2?.lastMessage) return conv1;

  const time1 = Date.parse(conv1?.lastMessage.created_at);
  const time2 = Date.parse(conv2?.lastMessage.created_at);
  return time2 - time1;
}
