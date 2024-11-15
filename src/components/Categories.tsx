import { CategoryType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface CategoriesProps {
  getCategoryProduct: (categoryName: string) => void;
}

export default function Categories({ getCategoryProduct }: CategoriesProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [categories]);

  return (
    <div>
      <ul className="flex flex-wrap items-center justify-center gap-5">
        {categories
          ? categories.map((item) => (
              <li key={item._id}>
                <Button onClick={() => getCategoryProduct(item.title)}>
                  {item.title.toUpperCase()}
                </Button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
