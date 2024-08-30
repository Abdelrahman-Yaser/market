
export const productValidation = (product: { title: string; description: string; imageurl: string; price: string}) => {
    const error: { title: string; description: string; imageurl: string; price: string,} = {
      title: "",
      description: "",
      imageurl: "",
      price: "",
   
    };
  
    const validUrl = /^(http|https|ftp):\/\/[^ ""]+$/.test(product.imageurl);
  
    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
      error.title = "Product title must be between 10 and 80 characters";
    }
  
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
      error.description = "Product description must be between 10 and 900 characters";
    }
  
    if (!product.imageurl.trim() || !validUrl) {
      error.imageurl = "A valid image URL is required";
    }
  
    if (!product.price.trim() || isNaN(Number(product.price))) {
      error.price = "A valid price is required";
    }

  
    return error;
  };
  