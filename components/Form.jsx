import Link from "next/link";

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) {
  return (
    <>
      <div className="text-center font-bold text-2xl m-5 text-gray-800">
        {type} Post
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <label>Title</label>
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
        />
        <label>Image Source URL (only from unsplash.com)</label>
        <input
          value={post.imageUrl}
          onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
          required
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Example https://images.unsplash.com/photo-1530893609608-32a9af3aa"
          type="text"
        />
        <label>Description</label>
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          required
          className="resize-none bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
        ></textarea>

        <div className="flex mt-4">
          <Link
            href="/"
            className="border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-black ml-2 bg-[#46ffd3]"
          >
            {submitting ? `${type}ing` : type}
          </button>
        </div>
      </form>
    </>
  );
}
