import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "imageUrl is required"],
    },
  },
  {
    timestamps: true,
  }
);
const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
