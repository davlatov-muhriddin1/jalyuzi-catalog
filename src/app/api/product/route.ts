import Product from "@/lib/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { imgs, title, description, price, category } = await req.json();

    if (!imgs || !title || !description || !price || !category) {
      return NextResponse.json({
        message: "Iltimos barcha bolimlarni toldiring",
      });
    }

    const newProduct = await Product.create({
      imgs,
      title,
      description,
      price,
      category,
    });

    return NextResponse.json({
      message: "Mahsulod royxatga qoshildi",
      product: newProduct,
    });
  } catch (error) {
    NextResponse.json({ message: "Server Error", error });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const allProducts = await Product.find({});

    return NextResponse.json({
      message: "Mahsulotlar olindi",
      products: allProducts,
    });
  } catch (error) {
    NextResponse.json({ message: "Server Error", error });
  }
}
