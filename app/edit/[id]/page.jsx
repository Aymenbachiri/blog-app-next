"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPost({ params }) {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/posts/new/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: post.title,
          description: post.description,
          imageUrl: post.imageUrl,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPostDetails = async () => {
      const res = await fetch(`/api/posts/new/${params.id}`);
      const data = await res.json();
      setPost({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
      });
    };
    if (params.id) {
      getPostDetails();
    }
  }, [params.id]);
  return (
    <>
      <div className="text-center mt-20 font-bold text-2xl m-5 text-gray-800">
        Edit Post
      </div>

      <form
        onSubmit={updatePost}
        className="mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <label>Title</label>
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
        />
        <label>Image Source URL (only from unsplash)</label>
        <input
          value={post.imageUrl}
          onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Example https://images.unsplash.com/photo-1530893609608-32a9af3aa"
          type="text"
        />
        <label>Description</label>
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          className="resize-none bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
        ></textarea>

        <div className="flex mt-4">
          <div className="border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <button
            type="submit"
            className="border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-black ml-2 bg-[#46ffd3]"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
