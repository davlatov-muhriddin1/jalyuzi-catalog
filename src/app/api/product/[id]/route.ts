import Product from "@/lib/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const singleProduct = await Product.findById(params.id);

    if (!singleProduct) {
      return NextResponse.json(
        { message: "Mahsulot topilmadi" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Mahsulot olindi",
      product: singleProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    await Product.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Mahsulot O'chirildi",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error },
      { status: 500 }
    );
  }
}
