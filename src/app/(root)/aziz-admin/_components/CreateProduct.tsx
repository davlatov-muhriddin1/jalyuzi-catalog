"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase";
import { CategoryType } from "@/types";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export default function CreateProduct() {
  // file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("combo");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setCategoryList(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // upload img to firebase
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);

    try {
      setIsLoading(true);

      const snapshot = await uploadBytes(storageRef, file);
      console.log("file upload successfully");

      const url = await getDownloadURL(snapshot.ref);
      console.log("Download url: ", url);

      setImgUrls((prev) => [...prev, url]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // create product
  const createProduct = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imgUrls || !title || !description || !price || !category) {
      console.log("error");

      return toast({
        variant: "destructive",
        title: "Input Error",
        description: "Iltimos barcha bo'limlarni to'ldiring",
      });
    }

    const productData = {
      imgs: imgUrls,
      title,
      description,
      category: category.toLowerCase(),
      price,
    };

    try {
      const { data } = await axios.post("/api/product", productData);

      setImgUrls([]);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("combo");
      return toast({
        title: "Success",
        description: "Mahsulot Yaratildi",
      });
    } catch (error) {
      console.log(error);
    }

    console.log(productData);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="p-2 sm:p-10">
      {/* file */}
      <div>
        <button
          className="bg-blue-700 w-full py-2 text-white font-semibold rounded-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          {isLoading ? "Yuklanmoqda..." : "Rasm Yuklash"}
        </button>
        <input
          type="file"
          className="absolute right-[99999px]"
          ref={fileInputRef}
          onChange={uploadImage}
        />

        <div className="mt-5 flex items-center gap-3 flex-wrap">
          {imgUrls
            ? imgUrls.map((item, index) => (
                <div
                  className="relative w-[70px] h-[70px] rounded-md overflow-hidden"
                  key={index}
                >
                  <Image src={item} alt="img" fill className="object-cover" />
                </div>
              ))
            : null}
        </div>
      </div>

      {/* data inputs */}
      <form className="pt-5" onSubmit={createProduct}>
        <div className="flex flex-col sm:flex-row gap-5 mb-5">
          {/* title */}
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

          {/* price */}
          <div className="grow">
            <label htmlFor="price" className="text-2xl block mb-2">
              Price
            </label>
            <input
              type="text"
              className="w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* description */}
        <div className="mb-5">
          <label htmlFor="description" className="text-2xl block mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[150px] resize-none block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          ></textarea>
        </div>

        {/* category */}
        <div className="mb-5">
          <label htmlFor="category" className="text-2xl block mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryList
              ? categoryList.map((item) => (
                  <option value={item.title} key={item._id}>
                    {item.title}
                  </option>
                ))
              : null}
          </select>
        </div>

        {/* button */}
        <Button className="w-full py-3 font-semibold">Create Product</Button>
      </form>
    </div>
  );
}
