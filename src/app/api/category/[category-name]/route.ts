import Product from "@/lib/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { "category-name": string } }
) {
  const { "category-name": categoryName } = params;
  try {
    await dbConnect();

    const categoryProduct = await Product.find({
      category: categoryName.toLowerCase(),
    });

    return NextResponse.json({
      message: "Mahsulot olindi",
      products: categoryProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error },
      { status: 500 }
    );
  }
}
