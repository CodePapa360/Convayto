import { createContext, useContext, useEffect, useReducer } from "react";
import { DARK_THEME, LOCAL_STORAGE_KEY } from "../config";

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

    case "TOGGLE_ACCOUNT_VIEW":
      return {
        ...state,
        isAccountView: !state.isAccountView,
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
    case "TOGGLE_SEARCH_VIEW":
      return {
        ...state,
        isSearchView: !state.isSearchView,
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

  function toggleAccountView() {
    dispatch({ type: "TOGGLE_ACCOUNT_VIEW" });
  }

  function closeAccountView() {
    dispatch({ type: "CLOSE_ACCOUNT_VIEW" });
  }

  function openAccountView() {
    dispatch({ type: "OPEN_ACCOUNT_VIEW" });
  }

  function toggleSearchView() {
    dispatch({ type: "TOGGLE_SEARCH_VIEW" });
  }

  function updateDarkMode(newMode) {
    dispatch({ type: "UPDATE_DARK_MODE", payload: newMode });
  }

  function closeFriendSidebar() {
    dispatch({ type: "CLOSE_FRIEND_SIDEBAR" });
  }

  function openFriendSidebar() {
    dispatch({ type: "OPEN_FRIEND_SIDEBAR" });
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    updateDarkMode(newMode);

    if (newMode) {
      document.documentElement.setAttribute("data-theme", DARK_THEME);
      localStorage.setItem(LOCAL_STORAGE_KEY, DARK_THEME);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTheme === DARK_THEME) {
      updateDarkMode(true);
      document.documentElement.setAttribute("data-theme", DARK_THEME);
    }
  }, []);

  const value = {
    dispatch,

    isAccountView,
    toggleAccountView,
    openAccountView,
    closeAccountView,

    isSidebarOpen,
    openSidebar,
    closeSidebar,

    isSearchView,
    toggleSearchView,

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
