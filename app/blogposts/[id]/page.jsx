"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import remove from "/public/assets/bin.png";
import edit from "/public/assets/edit.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const url = process.env.NEXTAUTH_URL;

  const getPost = async () => {
    try {
      const res = await fetch(`${url}/api/posts/new/${params.id}`);
      const data = await res.json();
      setPost(data);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handledelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/posts/new/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  return (
    <>
      <div className="container my-24 mx-auto md:px-6">
        {post && (
          <section key={post._id} className="mb-32">
            <Image
              src={post.imageUrl}
              width={900}
              height={500}
              objectFit="cover"
              className="object-cover object-center w-full"
              alt="image"
            />

            <div className="my-6 flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={post.creator.image}
                  width={50}
                  height={50}
                  objectFit="cover"
                  className="object-cover object-center rounded-full mr-4"
                  alt="avatar"
                />
                <div className="flex items-center gap-6">
                  <h1> Published by @{post.creator.username} , </h1>
                  <h1>{formatTimestamp(post.createdAt)} </h1>
                </div>
              </div>
              {session?.user.id === post.creator._id && (
                <div className="flex items-center gap-8">
                  <Link href="/edit/[id]" as={`/edit/${post._id}`}>
                    <Image
                      src={edit}
                      width={40}
                      height={30}
                      objectFit="cover"
                      className="object-cover object-center"
                      alt="edit post"
                    />
                  </Link>
                  <button onClick={() => handledelete()}>
                    <Image
                      src={remove}
                      width={40}
                      height={30}
                      objectFit="cover"
                      className="object-cover object-center  mr-4"
                      alt="delete post"
                    />
                  </button>
                </div>
              )}
            </div>

            <h1 className="mb-6 text-3xl font-bold">{post.title}</h1>

            <p>{post.description}</p>
          </section>
        )}
      </div>
    </>
  );
}
