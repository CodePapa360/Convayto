export function scrollToBottom(ref) {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

export function formatTime(rawTime) {
  // const rawTime = "Jan 12 2024 00:00:00 GMT+0600 (Bangladesh Standard Time)";
  if (!rawTime) return "-- : -- --";

  const date = new Date(rawTime);
  const now = new Date();

  //if date is less than today (00 hour) then return 9:3 pm
  //if date is more than today (00 hour) and less than two days (00 hour) then return Yesterdat at 9:3 pm
  //if date is more than two days (00 hour) and less than 7 days (00 hour) then return Sat at 9:3 pm
  //if date is more than 7 days (00 hour) and less than a year (00 hour) then return Jan 15 at 9:3 pm
  // if date is more than a year (00 hour) then return Jan 15 2024 at 9:3 pm

  const day = date.getDate();
  const today = now.getDate();
  const year = date.getFullYear();

  const thisYear = now.getFullYear();

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (today === day) {
    return new Intl.DateTimeFormat("en-US", options).format(new Date(rawTime));

    // return "Today";
  } else if (day >= today - 8 && thisYear === year) {
    options.weekday = "short";
    return new Intl.DateTimeFormat("en-US", options).format(new Date(rawTime));

    // return "Last Week";
  } else if (year === thisYear) {
    options.month = "short";
    options.day = "numeric";

    return new Intl.DateTimeFormat("en-US", options).format(new Date(rawTime));

    // return "This Year";
  } else {
    options.year = "numeric";
    options.month = "short";
    options.day = "numeric";

    return new Intl.DateTimeFormat("en-US", options).format(new Date(rawTime));

    // return "Last Year";
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
