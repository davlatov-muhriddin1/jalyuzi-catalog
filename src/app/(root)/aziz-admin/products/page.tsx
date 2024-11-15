"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/product/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [products]);

  return (
    <div className="p-2 sm:p-10">
      {products.length ? (
        products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col sm:flex-row justify-between mb-4 items-center border-b border-gray-600 py-2"
          >
            <div className="w-full h-[300px]  sm:w-[70px] sm:h-[70px] relative">
              <Image
                src={product.imgs[0]}
                alt="image"
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="grow sm:ml-5 my-4 sm:my-0 text-center sm:text-left">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>

            <div>
              <Button
                variant={"destructive"}
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
