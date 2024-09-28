import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

// Initial state
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// Action types
const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context
export const AuthContext = createContext(INITIAL_STATE);

// Context provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  // Effect to update localStorage when user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    axios.get("/api/logout").then(() => {
      dispatch({ type: LOGOUT });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
