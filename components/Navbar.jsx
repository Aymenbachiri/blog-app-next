"use client";
import Image from "next/image";
import logo from "../public/assets/feather-pen.png";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { FaPenNib } from "react-icons/fa6";
import { VscSignIn } from "react-icons/vsc";

export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-10 bg-slate-400 flex justify-center items-center gap-3 md:gap-20">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2" href="/">
          <Image src={logo} alt="logo" width={50} height={30} />
        </Link>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 bg-gray-200 rounded-lg p-2"
      >
        <AiOutlineHome size={30} />
        <h1 href="/">Home</h1>
      </Link>
      <div className="flex items-center gap-8">
        {session?.user ? (
          <>
            <button
              className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 text-white"
              onClick={signOut}
            >
              <VscSignOut size={30} />
              Sign Out
            </button>
            <Link
              className="flex items-center gap-2 bg-[#46ffd3] rounded-lg p-2 text-black"
              href="/create"
            >
              <FaPenNib />
              Write
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 text-white"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  <VscSignIn size={30} />
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
