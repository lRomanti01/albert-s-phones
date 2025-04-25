import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";


const defaultState = {
  session: null,
  setSessionState: (userSession) => {},
  removeSession: () => {},
};

export const AuthContext = createContext(defaultState);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  
  // Load session from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSession = localStorage.getItem("session");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    }
  }, []);

  const setSessionState = (userSession) => {
    if (typeof window !== "undefined") {
      if (userSession) {
        localStorage.setItem("session", JSON.stringify(userSession));
        setSession(userSession);
      } else {
        localStorage.removeItem("session");
        setSession(null);
      }
    }
  };

  const removeSession = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("session");
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, setSessionState, removeSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthProvider = () => useContext(AuthContext);
