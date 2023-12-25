import { createContext, useContext, useReducer } from "react";

const UiContext = createContext();

const InitialState = {
  isSidebarOpen: false,
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

  return (
    <UiContext.Provider value={{ state, dispatch }}>
      {children}
    </UiContext.Provider>
  );
}

function useUi() {
  const context = useContext(UiContext);
  if (context === undefined)
    throw new Error("UiContext was used outside the UiProvider");
  return context;
}
