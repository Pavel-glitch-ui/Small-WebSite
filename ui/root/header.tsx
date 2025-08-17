'use client';
import Link from "next/link";
import logo from '../../../src/logo.png'
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Header() {
    const { data } = useSession();
    return (
         <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      <div className="flex items-center">
        <Link href="/"><h1 className=" text-3xl">My Post App</h1></Link>
      </div>
      <nav>
        <ul className="flex space-x-4 text-sm font-medium">
          {data?.user ? (
            <li>
              <Link href="/profile" className="hover:underline text-lg">
                Home
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" className="hover:underline text-lg">
                Login
              </Link>
            </li>
          )}
          <li>
            <Link href="/" className="hover:underline text-lg">
              Feed
            </Link>
          </li>
          {data?.user && (
            <li>
              <Link href="/createPost" className="hover:underline text-lg">
                Create Post
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
    );
}