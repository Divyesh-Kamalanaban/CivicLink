import { createContext, useContext, useState } from "react";

export const postContext = createContext();
export const usePostContext = () => {
  return useContext(postContext);
};
export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const [selectedPost, setSelectedPost] = useState();
  const [selectedUnverifiedPost, setSelectedUnverifiedPost] = useState();
  const [unverifiedPosts, setUnverifiedPosts] = useState();
  return (
    <postContext.Provider
      value={{
        posts,
        setPosts,
        unverifiedPosts,
        setUnverifiedPosts,
        selectedPost,
        setSelectedPost,
        selectedUnverifiedPost,
        setSelectedUnverifiedPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
