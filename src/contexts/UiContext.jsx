import { createContext, useContext, useReducer } from "react";

const UiContext = createContext();

const InitialState = {
  isSidebarOpen: false,
  isAccountView: false,
  isSearchView: false,
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
    default:
      return state;
  }
}

function UiProvider({ children }) {
  const [{ isSidebarOpen, isAccountView, isSearchView }, dispatch] = useReducer(
    reducer,
    InitialState,
  );

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

  const value = {
    isAccountView,
    toggleAccountView,
    openAccountView,
    closeAccountView,

    dispatch,

    isSidebarOpen,
    openSidebar,
    closeSidebar,

    isSearchView,
    toggleSearchView,
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
