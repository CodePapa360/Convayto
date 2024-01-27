import { createContext, useContext, useReducer } from "react";

const AppDataContext = createContext();

const InitialState = {
  currentConversationId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_CONVERSATION_ID":
      return {
        ...state,
        currentConversationId: action.payload,
      };
    default:
      return state;
  }
}

const AppDataProvider = ({ children }) => {
  const [{ currentConversationId }, dispatch] = useReducer(
    reducer,
    InitialState,
  );

  function setCurrentConversationId(conversationId) {
    dispatch({ type: "SET_CURRENT_CONVERSATION_ID", payload: conversationId });
  }

  const value = {
    dispatch,

    currentConversationId,
    setCurrentConversationId,
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
