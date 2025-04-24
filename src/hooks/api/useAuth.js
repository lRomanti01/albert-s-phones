import React, { useState } from "react";
import http from "../../utils/http";
import { useAuthProvider } from "../../context/AuthContext";

export const  useLogIn = (body) => {
  const [loading, setLoading] = useState(false);
  const { setSessionState } = useAuthProvider();

  const load = async () => {
    try {
      setLoading(true);

      // Perform the login request
      const response = await http.post("auth/login", body);

      // Assuming the response has a user object in data
      setSessionState({ ...response.data.user, token: response.data.token });

      return { response, error: null };
    } catch (error) {
      console.error("Login error:", error);

      return {
        response: null,
        error: {
          response: error.response.data,
          message:
            error.response?.data.mensaje || "An unexpected error occurred",
        },
      };
    } finally {
      setLoading(false);
    }
  };

  return [loading, load];
};

export const useSignUp = (body) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setSessionState } = useAuthProvider();

  async function load() {
    try {
      setLoading(true);
      const response = await http.post("user/createUser", body);
      setSessionState({ ...response.data.user, token: response.data.token });

      // const data = await signUp(formData);
      return { response, error: null };
    } catch (error) {
      console.error("SignUp error:", error.response.data.message);

      return {
        response: null,
        error: {
          response: error.response.data,
          message:
            error.response?.data.message || "An unexpected error occurred",
        },
      };
    } finally {
      setLoading(false);
    }
  }

  return [loading, load];
};
