import Category from "@/lib/models/Category";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({
        message: "Iltimos barcha bolimlarni toldiring",
      });
    }

    const newCategory = await Category.create({ title });

    return NextResponse.json({ message: "Categoriya Yaratildi" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const categories = await Category.find({});

    return NextResponse.json({ message: "Categorialar olindi", categories });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error },
      { status: 500 }
    );
  }
}
