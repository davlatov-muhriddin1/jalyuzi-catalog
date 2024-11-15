"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

export default function CreateCategory() {
  const [title, setTitle] = useState<string>("");

  // create category
  const createCategory = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!title) {
        return toast({
          variant: "destructive",
          title: "Input Error",
          description: "Iltimos barcha bo'limlarni to'ldiring",
        });
      }

      const { data } = await axios.post("/api/category", {
        title: title.toLowerCase(),
      });
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 sm:p-10">
      <h2 className="text-3xl font-bold mb-5">Create Category</h2>
      <form onSubmit={createCategory}>
        <div className="grow">
          <label htmlFor="title" className="text-2xl block mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <Button className="mt-5 w-full font-semibold">Create Category</Button>
      </form>
    </div>
  );
}
