export function scrollToBottom(ref) {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

export function formatTime(rawDate) {
  if (!rawDate) return "-- : --";

  //if date is less than today (00 hour) then return 9:3 pm
  //if date is more than today (00 hour) and less than two days (00 hour) then return Yesterdat at 9:3 pm
  //if date is more than two days (00 hour) and less than 7 days (00 hour) then return Sat at 9:3 pm
  //if date is more than 7 days (00 hour) and less than a year (00 hour) then return Jan 15 at 9:3 pm
  // if date is more than a year (00 hour) then return Jan 15 2024 at 9:3 pm

  const date = new Date(rawDate);
  const now = new Date();

  // Calculating the time difference in days
  const diffInDays = Math.round((now - date) / (1000 * 60 * 60 * 24));

  // Format the time portion
  const timeString = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (diffInDays === 0) {
    // Today
    return timeString.toLowerCase();
  } else if (diffInDays === 1) {
    // Yesterday
    return `Yesterday at ${timeString.toLowerCase()}`;
  } else if (diffInDays < 7) {
    // Weekday
    const weekday = date.toLocaleDateString([], { weekday: "short" });
    return `${weekday} at ${timeString.toLowerCase()}`;
  } else {
    // Check if the year is the same
    const isSameYear = now.getFullYear() === date.getFullYear();

    if (isSameYear) {
      // Month and day (within the same year)
      const monthDayString = date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
      return `${monthDayString} at ${timeString.toLowerCase()}`;
    } else {
      // Year included (different year)
      const fullDateString = date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return `${fullDateString} at ${timeString.toLowerCase()}`;
    }
  }
}

//////////////////////////

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
