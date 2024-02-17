import { createContext, useContext, useReducer } from "react";

const AppDataContext = createContext();

const InitialState = {
  currentConversation: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_CONVERSATION":
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

  function setCurrentConversation(conversation) {
    dispatch({
      type: "SET_CURRENT_CONVERSATION",
      payload: conversation,
    });

    // console.log("Updated conversation state", conversation);
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
