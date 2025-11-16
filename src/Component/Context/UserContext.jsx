import React, { createContext, useContext, useState } from 'react';

// Create the initial context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);
  console.log(user);

  // Getter function to retrieve the user
  const getUser = () => user;

  // Setter function to update the user
  const setUserContext = (newUser) => setUser(newUser);

  // Context value to be provided
  const contextValue = {
    getUser,
    setUserContext,
  };

  // Provide the context value to the children components
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
