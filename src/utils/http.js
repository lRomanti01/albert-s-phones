import axios from "axios";

const http = axios.create({
  baseURL: "https://albert-s-phone-api-production.up.railway.app/api/",
});

// Interceptor to add the token to the request headers

http.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem("session"); 
    if (session) {
      const userData = JSON.parse(session); 
      if (userData.token) {
        config.headers["x-access-token"] = userData.token; 
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Please check your credentials.");
      localStorage.removeItem("session"); // Remove session from localStorage
    }
    return Promise.reject(error);
  }
);


export default http;
