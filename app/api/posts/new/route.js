import Blog from "@/models/blog";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { userId, title, description, imageUrl } = await request.json();
  try {
    await connectToDB();
    const newBlog = new Blog({
      creator: userId,
      title: title,
      description: description,
      imageUrl: imageUrl,
    });
    await newBlog.save();
    return new Response("Blog created successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new blog", { status: 500 });
  }
};
