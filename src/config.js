// Chage the production/local URL according to your environment
export const REDIRECT_URL_LOCAL = "http://localhost:3000";
export const REDIRECT_URL_PRODUCTION = "https://chat-su.vercel.app";

//name of the app
export const APP_NAME = "Convayto";

// A nice default bio for new users which will use the app name
export const DEFAULT_BIO = `Hey there! I'm using ${APP_NAME}`;

export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";
export const LOCAL_STORAGE_KEY = "theme";
export const MAX_BIO_LENGTH = 140;
export const MAX_NAME_LENGTH = 70;
export const MIN_USERNAME_LENGTH = 4;
export const MAX_USERNAME_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 6;
export const MINIMUM_SEARCH_LENGTH = 2;
export const MAX_PREFETCHED_CONVERSATIONS = 5;
export const MAX_MESSAGES_PER_PAGE = 20;

export const USERNAME_REGEX = /^[a-z0-9_-]+$/;
export const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9 ]+$/;
export const EMAIL_REGEX =
  /^[^\W_]+\w*(?:[.-]\w*)*[^\W_]+@[^\W_]+(?:[.-]?\w*[^\W_]+)*(?:\.[^\W_]{2,})$/;

// This is just for error message. If you want to change the actual file size limit, you need to change it in the backend as well.
export const MAXIMUM_AVATAR_FILE_SIZE = "5";
export const ACCEPTED_AVATAR_FILE_TYPES = "image/jpeg,image/png,image/webp";
