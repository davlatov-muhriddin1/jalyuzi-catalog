"use client";

import { ProductType } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useRouter } from "next/navigation";

export default function ProductItem({
  _id,
  imgs,
  title,
  description,
  price,
  category,
  getProductDetail,
}: ProductType) {
  const router = useRouter();

  return (
    <div>
      <div className="w-full sm:w-[350px] bg-white rounded-lg shadow-md overflow-hidden">
        {/* Rasm */}

        <Carousel className="w-full">
          <CarouselContent>
            {imgs.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-48">
                  <Image
                    src={img}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Cardning kontenti */}
        <div className="p-4">
          {/* Mahsulot nomi */}
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>

          {/* Mahsulot descriptioni */}
          <p className="text-gray-600 text-sm mb-2">
            {description.slice(0, 40)}...
          </p>

          {/* Kategoriya */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {category}
          </span>

          {/* Narx */}
          <p className="text-lg font-semibold text-green-600 mt-2">${price}</p>

          {/* Tugmalar */}
          <div className="flex flex-col md:flex-row mt-4 gap-3">
            <Button onClick={() => router.push(`/product-detail/${_id}`)}>
              To'liq malumot olish
            </Button>
            <a href="https://t.me/aziz_hasanov7777">
              <Button>Buyurtma Berish</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
