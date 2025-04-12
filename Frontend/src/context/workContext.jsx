import { createContext, useContext, useState } from "react";

export const workContext = createContext();
export const useWorkContext = () => {
  return useContext(workContext);
};
export const WorkContextProvider = ({ children }) => {
  const [works, setWorks] = useState();
  const [unverifiedWorks, setUnverifiedWorks] = useState();
  const [selectedWork, setSelectedWork] = useState();
  const [selectedUnverifiedWork, setSelectedUnverifiedWork] = useState();
  return (
    <workContext.Provider
      value={{
        works,
        setWorks,
        unverifiedWorks,
        setUnverifiedWorks,
        selectedWork,
        setSelectedWork,
        selectedUnverifiedWork,
        setSelectedUnverifiedWork,
      }}
    >
      {children}
    </workContext.Provider>
  );
};
