import { createContext, useContext, useReducer } from "react";

const AppDataContext = createContext();

const InitialState = {
  currentConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_CONV_USER":
      return {
        ...state,
        currentConversation: action.payload,
      };
    default:
      return state;
  }
}

const AppDataProvider = ({ children }) => {
  const [{ currentConversation }, dispatch] = useReducer(reducer, InitialState);

  function setCurrentConversation(user) {
    dispatch({
      type: "SET_CURRENT_CONV_USER",
      payload: user,
    });
  }

  const value = {
    dispatch,

    currentConversation,
    setCurrentConversation,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined)
    throw new Error("UiContext was used outside the UiProvider");
  return context;
}

export { AppDataProvider, useAppData };
