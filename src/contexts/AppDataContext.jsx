import { createContext, useContext, useReducer } from "react";

const AppDataContext = createContext();

const InitialState = {
  currentConvUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_CONV_USER":
      return {
        ...state,
        currentConvUser: action.payload,
      };
    default:
      return state;
  }
}

const AppDataProvider = ({ children }) => {
  const [{ currentConvUser }, dispatch] = useReducer(reducer, InitialState);

  function setCurrentConvUser(user) {
    dispatch({
      type: "SET_CURRENT_CONV_USER",
      payload: user,
    });
  }

  const value = {
    dispatch,

    currentConvUser,
    setCurrentConvUser,
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
