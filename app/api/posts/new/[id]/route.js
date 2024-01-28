import Blog from "@/models/blog";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const blog = await Blog.findById(params.id).populate("creator");
    if (!blog) {
      return new Response("Blog not found", { status: 404 });
    }
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response("Blog not found", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { title, description, imageUrl } = await request.json();
  try {
    await connectToDB();

    //Find the existing post by ID
    const existingPost = await Blog.findById(params.id);
    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }
    //Update the post with the new data
    existingPost.title = title;
    existingPost.description = description;
    existingPost.imageUrl = imageUrl;

    await existingPost.save();

    return new Response("Post updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Error updating post", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    //Find the post by id and delete it
    await Blog.findByIdAndDelete(params.id);
    return new Response("Blog deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting post", { status: 500 });
  }
};
