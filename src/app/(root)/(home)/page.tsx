"use client";

import Categories from "@/components/Categories";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { ProductType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryProduct = async (categoryName: string) => {
    try {
      const { data } = await axios.get(`/api/category/${categoryName}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="p-10 bg-[#D4D4D7] min-h-[100vh]">
      <Categories getCategoryProduct={getCategoryProduct} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {products.length ? (
          products.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
