import { createContext, useContext, useState, useEffect } from "react";

export const csrContext = createContext();
export const useCSRContext = () => {
  return useContext(csrContext);
};

export const CSRContextProvider = ({ children }) => {
  const [csrIssues, setCSRIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCSRIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/post/getall', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch CSR issues');
      }
      
      const data = await response.json();
      setCSRIssues(data.posts || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching CSR issues:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCSRIssue = async (issueData) => {
    try {
      const response = await fetch('http://localhost:8000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          ...issueData,
          contact: issueData.contact || 'Not provided',
          images: issueData.images || []
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create CSR issue');
      }

      const newIssue = await response.json();
      setCSRIssues(prev => [...prev, newIssue]);
      return newIssue;
    } catch (err) {
      setError(err.message);
      console.error('Error creating CSR issue:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCSRIssues();
  }, []);

  return (
    <csrContext.Provider value={{
      csrIssues,
      loading,
      error,
      fetchCSRIssues,
      createCSRIssue
    }}>
      {children}
    </csrContext.Provider>
  );
}; 