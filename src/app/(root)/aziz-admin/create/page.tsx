import React from "react";
import CreateProduct from "../_components/CreateProduct";
import CreateCategory from "../_components/CreateCategory";

export default function Create() {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-[60%]">
        <CreateProduct />
      </div>
      <div className="w-full sm:w-[40%]">
        <CreateCategory />
      </div>
    </div>
  );
}
