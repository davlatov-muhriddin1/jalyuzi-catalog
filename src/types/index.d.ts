export interface ProductType {
  _id: string;
  imgs: string[];
  title: string;
  description: string;
  price: string;
  category: string;
  getProductDetail?: (id: string) => void;
}

export interface CategoryType {
  _id: string;
  title: string;
}
