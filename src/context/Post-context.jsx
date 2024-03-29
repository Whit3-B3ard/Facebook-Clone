import { baseURL } from "../config/api.js";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./User-context.jsx";

const PostContext = createContext(null);

export const usePostContext = () => useContext(PostContext);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);

  const getPost = async () => {
    try {
      const fetchPosts = await axios.get(baseURL + "/posts/fetchposts");
      setPosts(fetchPosts.data.posts);
      console.log("fetched posts",fetchPosts.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("content", e.target.content.value);
    formData.append("postImage", e.target.postImage.files[0]);
    formData.append("author", user._id);

    console.log(formData);

    setIsLoading(true);

    try {
      const response = await axios.post(
        baseURL + "/posts/createpost",
        formData
      );
      const newPost = response.data;
      e.target.reset();
      window.location.replace("/home");
      console.log(newPost);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const likesHandler = async (postId) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        baseURL + `/posts/deletepost/${postId}`
      );
      window.location.replace("/home");
      console.log(postId);
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostContext.Provider
      value={{
        createPost,
        likesHandler,
        deletePost,
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
