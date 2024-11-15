import Category from "@/lib/models/Category";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, route: { params: { id: string } }) {
  try {
    await dbConnect();
    console.log(route.params.id);

    await Category.findByIdAndDelete(route.params.id);

    return NextResponse.json({ message: "Categoriya o'chirildi" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error },
      { status: 500 }
    );
  }
}
