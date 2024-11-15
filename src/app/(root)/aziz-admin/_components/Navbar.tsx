import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="py-4 border-b shadow-md">
      <ul className="flex flex-wrap items-center gap-4 justify-center">
        <li>
          <Link
            href={"/"}
            className="text-xl bg-black py-2 px-4 rounded-md text-white"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/aziz-admin/create"}
            className="text-xl bg-black py-2 px-4 rounded-md text-white"
          >
            Add
          </Link>
        </li>
        <li>
          <Link
            href={"/aziz-admin/products"}
            className="text-xl bg-black py-2 px-4 rounded-md text-white"
          >
            Products
          </Link>
        </li>

        <li>
          <Link
            href={"/aziz-admin/categories"}
            className="text-xl bg-black py-2 px-4 rounded-md text-white"
          >
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
}
