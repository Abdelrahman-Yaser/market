import { ProductName } from "../../type";

// Interface for product details
export interface Iproduct 
{
    id?: string ; // Product ID (optional): can be string, number, or undefined
    title: string; // Product title (required)
    description: string; // Product description (required)
    src?: string; // Source URL for the product image (optional)
    imageurl: string; // Image URL for the product (optional)
    price: string; // Price of the product (optional)
    colores: string[]; // Array of available colors for the product (optional)
    categorys: { // Product category (optional)
      name: string; // Category name (optional)
      imageURL: string; // URL of the category image (optional)
    };
}

  // Interface for form input list details
export interface IFormInputList {
    id: string; // Input ID (required)
    name: ProductName
    // Input name (required)
    label: string; // Input label (required)
    type: string; // Input type (e.g., text, number, email) (required)
}

export interface Icategory {
  id: number;
  name: string;
  imageURL: string;
}
