"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function HomePage() {
  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  return <PostCard data={allPosts} />;
}
