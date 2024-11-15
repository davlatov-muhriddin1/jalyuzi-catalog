"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [allCategory, setAllCategory] = useState<CategoryType[]>([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setAllCategory(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/delete-category/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="py-5">
      <div className="flex items-center flex-wrap justify-center gap-5">
        {allCategory ? (
          allCategory.map((item) => (
            <div
              key={item._id}
              className="border-2 rounded-md border-gray-800 text-center p-5"
            >
              <h3 className="text-2xl mb-3">{item.title}</h3>
              <Button
                variant={"destructive"}
                onClick={() => deleteCategory(item._id)}
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
