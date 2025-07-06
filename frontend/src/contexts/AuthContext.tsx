import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../services/api'; // For making API calls if needed within context

interface IUser {
  _id: string;
  id?: string;
  username: string;
  email: string;
  isAdmin: boolean;
  // Add other user properties as needed from your backend User model
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionWarning: { show: boolean; timeRemaining: number } | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAuthToken: () => Promise<boolean>;
  extendSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true until initial check is done
  const [sessionWarning, setSessionWarning] = useState<{ show: boolean; timeRemaining: number } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

    const initializeAuth = async () => {
      if (storedToken) {
        try {
          const decodedToken = jwtDecode<{ _id: string; username: string; email: string; isAdmin: boolean; exp: number }>(storedToken);
          
          // Check token expiry
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            // Token still valid
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              // Fetch user details if not in storage
              try {
                const response = await api.get('/auth/me');
                const userData = response.data.user;
                const fetchedUser = {
                  _id: userData.id || userData._id,
                  id: userData.id,
                  username: userData.username,
                  email: userData.email,
                  isAdmin: userData.isAdmin
                };
                setUser(fetchedUser);
                localStorage.setItem('user', JSON.stringify(fetchedUser));
              } catch (err) {
                console.error('Failed to fetch user profile with stored token:', err);
                logout();
              }
            }
          } else if (storedRefreshToken) {
            // Token expired but we have refresh token - try to refresh
            setRefreshToken(storedRefreshToken);
            const refreshSuccess = await refreshAuthToken();
            if (!refreshSuccess) {
              logout();
            }
          } else {
            // Token expired and no refresh token
            logout();
          }
        } catch (error) {
          console.error('Invalid token found in storage:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Set up periodic token validation
  useEffect(() => {
    if (!token) return;

    const checkTokenExpiry = () => {
      try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const timeUntilExpiry = (decodedToken.exp * 1000) - Date.now();
        const timeInMinutes = Math.floor(timeUntilExpiry / 60000);
        
        // Show warning if token expires in less than 10 minutes
        if (timeUntilExpiry < 10 * 60 * 1000 && timeUntilExpiry > 0) {
          setSessionWarning({
            show: true,
            timeRemaining: Math.floor(timeUntilExpiry / 1000)
          });
        }
        
        // Auto refresh if token expires in less than 5 minutes
        if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
          refreshAuthToken();
        }
        
        // If token expired, logout
        if (timeUntilExpiry <= 0) {
          logout();
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
        logout();
      }
    };

    // Check token expiry every 30 seconds for more responsive warnings
    const interval = setInterval(checkTokenExpiry, 30 * 1000);
    
    return () => clearInterval(interval);
  }, [token, refreshToken]);

  const login = (newToken: string, newRefreshToken: string) => {
    try {
      const decodedToken = jwtDecode<{ id?: string; _id?: string; username: string; email?: string; isAdmin: boolean }>(newToken);
      const userData: IUser = {
        _id: decodedToken.id || decodedToken._id || '',
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email || '', 
        isAdmin: decodedToken.isAdmin,
      };
      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setRefreshToken(newRefreshToken);
      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; // Update axios header immediately
    } catch (error) {
      console.error('Failed to decode token during login:', error);
      logout(); // Ensure clean state if token is bad
    }
  };

  const refreshAuthToken = async (): Promise<boolean> => {
    try {
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', { refreshToken });
      
      if (response.data.success) {
        const { token: newToken, refreshToken: newRefreshToken } = response.data;
        
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        setToken(newToken);
        setRefreshToken(newRefreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        return true;
      }
      
      throw new Error('Token refresh failed');
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  const extendSession = () => {
    refreshAuthToken();
    setSessionWarning(null);
  };

  const logout = () => {
    // Call logout endpoint to invalidate refresh token
    if (refreshToken) {
      api.post('/auth/logout').catch(console.error);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setSessionWarning(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      refreshToken, 
      isAuthenticated: !!user, 
      isLoading, 
      sessionWarning,
      login, 
      logout, 
      refreshAuthToken,
      extendSession
    }}>
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