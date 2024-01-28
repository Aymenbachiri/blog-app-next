"use client";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePost() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          description: post.description,
          imageUrl: post.imageUrl,
          userId: session?.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        router.push("/");
      } else {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="mt-20">
        <Form
          type="Create"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPost}
        />
      </div>
    </>
  );
}
