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

export function sortConverseByTime(conv1, conv2) {
  if (!conv1?.messages) return conv2;
  if (!conv2?.messages) return conv1;

  const time1 = Date.parse(conv1?.messages.created_at);
  const time2 = Date.parse(conv2?.messages.created_at);
  return time2 - time1;
}

export function sortMessageByTime(message1, message2) {
  if (!message1?.created_at) return message2;
  if (!message2?.created_at) return message1;

  const time1 = Date.parse(message1?.created_at);
  const time2 = Date.parse(message2?.created_at);
  return time1 - time2;
}
