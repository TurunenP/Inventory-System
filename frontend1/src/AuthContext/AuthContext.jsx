// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const BACKEND_URL =
//   import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/users/getuser",
//         {
//           withCredentials: true,
//         }
//       );
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/login",
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );

//       if (response.data) {
//         await fetchUser(); // Refresh user details after login
//       }

//       if (user.role === "admin") {
//         navigate("/Staff"); // Redirect to the admin dashboard
//       } else {
//         navigate("/Student"); // Redirect to the user dashboard
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error("Invalid credentials");
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/logout",
//         {},
//         { withCredentials: true }
//       );
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// ✅ Use environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/getuser`, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data) {
        await fetchUser();
      }

      // Wait until user is set before checking role
      const newUser = response.data;
      if (newUser.role === "admin") {
        navigate("/Staff");
      } else {
        navigate("/Student");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
