import { createContext, useContext, useEffect, useReducer } from "react";
import { DARK_THEME, LIGHT_THEME, LOCAL_STORAGE_KEY } from "../config";

const UiContext = createContext();

const InitialState = {
  isSidebarOpen: false,
  isAccountView: false,
  isSearchView: false,
  isDarkMode: true,
  isFriendsSidebarOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: true,
      };
    case "CLOSE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: false,
      };
    case "OPEN_ACCOUNT_VIEW":
      return {
        ...state,
        isAccountView: true,
      };
    case "CLOSE_ACCOUNT_VIEW":
      return {
        ...state,
        isAccountView: false,
      };
    case "OPEN_SEARCH_VIEW":
      return {
        ...state,
        isSearchView: true,
      };
    case "CLOSE_SEARCH_VIEW":
      return {
        ...state,
        isSearchView: false,
      };
    case "UPDATE_DARK_MODE":
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case "CLOSE_FRIEND_SIDEBAR":
      return {
        ...state,
        isFriendsSidebarOpen: false,
      };
    case "OPEN_FRIEND_SIDEBAR":
      return {
        ...state,
        isFriendsSidebarOpen: true,
      };

    default:
      return state;
  }
}

function UiProvider({ children }) {
  const [
    {
      isSidebarOpen,
      isAccountView,
      isSearchView,
      isDarkMode,
      isFriendsSidebarOpen,
    },
    dispatch,
  ] = useReducer(reducer, InitialState);
  function openSidebar() {
    dispatch({ type: "OPEN_SIDEBAR" });
  }

  function closeSidebar() {
    dispatch({ type: "CLOSE_SIDEBAR" });
  }

  // Account View
  function popAccountViewBack() {
    dispatch({ type: "CLOSE_ACCOUNT_VIEW" });
    window.removeEventListener("popstate", popAccountViewBack);
  }

  function openAccountView() {
    dispatch({ type: "OPEN_ACCOUNT_VIEW" });
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", popAccountViewBack);
  }

  function closeAccountView() {
    dispatch({ type: "CLOSE_ACCOUNT_VIEW" });
    window.history.back();
    window.removeEventListener("popstate", popAccountViewBack);
  }

  // Search View
  function popSearchViewBack() {
    dispatch({ type: "CLOSE_SEARCH_VIEW" });
    window.removeEventListener("popstate", popSearchViewBack);
  }

  function openSearchView() {
    dispatch({ type: "OPEN_SEARCH_VIEW" });
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", popSearchViewBack);
  }

  function closeSearchView({ back = true } = {}) {
    back && window.history.back();
    dispatch({ type: "CLOSE_SEARCH_VIEW" });
    window.removeEventListener("popstate", popSearchViewBack);
  }

  // Friends Sidebar
  function popFriendSidebarBack() {
    dispatch({ type: "CLOSE_FRIEND_SIDEBAR" });
    window.removeEventListener("popstate", popFriendSidebarBack);
  }

  function openFriendSidebar() {
    dispatch({ type: "OPEN_FRIEND_SIDEBAR" });

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", popFriendSidebarBack);
  }

  function closeFriendSidebar() {
    dispatch({ type: "CLOSE_FRIEND_SIDEBAR" });

    window.history.back();
    window.removeEventListener("popstate", popFriendSidebarBack);
  }

  // Dark Mode
  function updateDarkMode(newMode) {
    dispatch({ type: "UPDATE_DARK_MODE", payload: newMode });

    if (newMode) {
      document.documentElement.classList.add(DARK_THEME);
      localStorage.setItem(LOCAL_STORAGE_KEY, DARK_THEME);
    } else {
      document.documentElement.classList.remove(DARK_THEME);
      localStorage.setItem(LOCAL_STORAGE_KEY, LIGHT_THEME);
    }
  }

  useEffect(() => {
    const hasPreviousPreference = localStorage.getItem(LOCAL_STORAGE_KEY);
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (!hasPreviousPreference) return updateDarkMode(prefersDarkMode);
    if (hasPreviousPreference === DARK_THEME) return updateDarkMode(true);
    if (hasPreviousPreference === LIGHT_THEME) return updateDarkMode(false);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    updateDarkMode(newMode);
  };

  const value = {
    dispatch,

    isAccountView,
    openAccountView,
    closeAccountView,

    isSidebarOpen,
    openSidebar,
    closeSidebar,

    isSearchView,
    openSearchView,
    closeSearchView,

    isDarkMode,
    toggleDarkMode,

    isFriendsSidebarOpen,
    closeFriendSidebar,
    openFriendSidebar,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

function useUi() {
  const context = useContext(UiContext);
  if (context === undefined)
    throw new Error("UiContext was used outside the UiProvider");
  return context;
}

export { UiProvider, useUi };
