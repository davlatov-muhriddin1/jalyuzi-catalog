"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductType } from "@/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [productDetail, setProductDetail] = useState<ProductType>();

  const getProductDetail = async () => {
    try {
      const { data } = await axios.get(`/api/product/${params.id}`);
      setProductDetail(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      {productDetail ? (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
          {/* Mahsulot rasmi */}
          {/* */}

          <Carousel className="w-full">
            <CarouselContent>
              {productDetail?.imgs.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-64 sm:h-80 lg:h-96 w-full mb-6">
                    <Image
                      src={img}
                      alt={productDetail?.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Mahsulot nomi */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
            {productDetail?.title}
          </h1>

          {/* Mahsulot kategoriyasi */}
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-3 py-1 rounded">
            {productDetail?.category}
          </span>

          {/* Mahsulot narxi */}
          <p className="text-xl sm:text-2xl font-bold text-green-600 mt-4 mb-4">
            ${productDetail?.price}
          </p>

          {/* Mahsulot tavsifi */}
          <p className="text-gray-700 text-sm sm:text-lg mb-6">
            {productDetail?.description}
          </p>

          {/* Tugma */}
          <a href="https://t.me/aziz_hasanov7777">
            <Button>Buyurtma Berish</Button>
          </a>
        </div>
      ) : (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      )}
    </>
  );
}
