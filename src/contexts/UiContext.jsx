import { createContext, useContext, useReducer } from "react";

const UiContext = createContext();

const InitialState = {
  isSidebarOpen: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
}

function UiProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, InitialState);

  function toggleSidebar() {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }

  const value = { state, dispatch, toggleSidebar };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

function useUi() {
  const context = useContext(UiContext);
  if (context === undefined)
    throw new Error("UiContext was used outside the UiProvider");
  return context;
}

export { UiProvider, useUi };
