import React, { createContext, useState, ReactNode } from 'react';
import { UserType, UserContextType } from '../types'; 

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}  
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);


return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
