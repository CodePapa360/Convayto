export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";
export const LOCAL_STORAGE_KEY = "theme";
export const MAX_BIO_LENGTH = 140;
export const MAX_NAME_LENGTH = 70;
export const MIN_USERNAME_LENGTH = 4;
export const MAX_USERNAME_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 6;
export const MINIMUM_SEARCH_LENGTH = 2;
export const MAX_PREFETCHED_CONVERSATIONS = 0;
export const MAX_MESSAGES_PER_PAGE = 20;

export const USERNAME_REGEX = /^[a-z0-9_-]+$/;
export const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9 ]+$/;
export const EMAIL_REGEX =
  /^[^\W_]+\w*(?:[.-]\w*)*[^\W_]+@[^\W_]+(?:[.-]?\w*[^\W_]+)*(?:\.[^\W_]{2,})$/;
