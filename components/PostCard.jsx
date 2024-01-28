import Image from "next/image";
import feather from "../public/assets/f-user.png";
import Link from "next/link";

export default function PostCard({ data }) {
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
    <div className="flex mt-20 items-center gap-4 w-full h-full p-8">
      <div className="grid md:grid-cols-4 gap-6 md:gap-3 w-full h-full">
        {data.map((item) => (
          <div
            key={item._id}
            className="relative w-full flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl"
          >
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <Image
                src={item.imageUrl}
                width={300}
                height={100}
                objectFit="cover"
                className="object-cover object-center w-full h-full"
                alt="card-image"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {item.title}
                </h5>
                <h1>{formatTimestamp(item.createdAt)} </h1>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {item.description.substring(0, 100)}...
              </p>
            </div>
            <div className="p-6 pt-0 flex justify-between items-center">
              <div className="flex items-end">
                <Image src={feather} alt="feather" width={50} height={50} />
                <h1 className="-ml-[15px]">{item.creator.username} </h1>
              </div>
              <Link
                href={`/blogposts/${item._id}`}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
