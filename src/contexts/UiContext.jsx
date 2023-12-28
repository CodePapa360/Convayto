import { createContext, useContext, useReducer } from "react";

const UiContext = createContext();

const InitialState = {
  isSidebarOpen: false,
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
    default:
      return state;
  }
}

function UiProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, InitialState);

  function openSidebar() {
    dispatch({ type: "OPEN_SIDEBAR" });
  }

  function closeSidebar() {
    dispatch({ type: "CLOSE_SIDEBAR" });
  }

  const value = { state, dispatch, openSidebar, closeSidebar };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

function useUi() {
  const context = useContext(UiContext);
  if (context === undefined)
    throw new Error("UiContext was used outside the UiProvider");
  return context;
}

export { UiProvider, useUi };
