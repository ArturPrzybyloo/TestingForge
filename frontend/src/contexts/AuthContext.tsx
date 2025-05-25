import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../services/api'; // For making API calls if needed within context

interface IUser {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  // Add other user properties as needed from your backend User model
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  // loadUser: () => void; // Could be used to re-validate token/user on app load
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true until initial check is done

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      try {
        const decodedToken = jwtDecode<{ _id: string; username: string; email: string; isAdmin: boolean; exp: number }>(storedToken);
        // Check token expiry
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // If user not in local storage but token exists and is valid, fetch user details
            // This might happen if localStorage was cleared for user but not token
            // Or simply to ensure user data is fresh
            api.get('/auth/profile') // Assuming this endpoint exists and returns user based on token
              .then(response => {
                const fetchedUser = response.data;
                setUser(fetchedUser);
                localStorage.setItem('user', JSON.stringify(fetchedUser));
              })
              .catch(err => {
                console.error('Failed to fetch user profile with stored token:', err);
                logout(); // Token might be invalid or user deleted
              });
          }
        } else {
          // Token expired
          logout();
        }
      } catch (error) {
        console.error('Invalid token found in storage:', error);
        logout(); // Clear invalid token and user
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    try {
      const decodedToken = jwtDecode<{ _id: string; username: string; email: string; isAdmin: boolean }>(newToken);
      const userData: IUser = {
        _id: decodedToken._id,
        username: decodedToken.username,
        email: decodedToken.email, 
        isAdmin: decodedToken.isAdmin,
      };
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; // Update axios header immediately
    } catch (error) {
      console.error('Failed to decode token during login:', error);
      logout(); // Ensure clean state if token is bad
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    // Optionally, redirect to login page via React Router's useNavigate() if called from a component
    // Or, rely on ProtectedRoute to handle redirection.
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 