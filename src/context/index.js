import React, { useState, useCallback } from 'react';

// User Context
export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// API Error Context
export const APIErrorContext = React.createContext({
  error: null,
  setError: () => {},
  removeError: () => {},
});

const APIErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const removeError = () => setError(null);
  const addError = (message, status) => setError({ message, status });

  const contextValue = {
    error,
    addError: useCallback((message, status) => addError(message, status), []),
    removeError: useCallback(() => removeError(), []),
  };
  return (
    <APIErrorContext.Provider value={contextValue}>
      {children}
    </APIErrorContext.Provider>
  );
};

export { APIErrorProvider, UserProvider };
