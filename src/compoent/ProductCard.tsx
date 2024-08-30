import React from 'react';
import MainImage from "./shortcut/MainImage";
// import Button from "./shortcut/Button";
import { Iproduct } from "./InterFace/Interface";
import FunctionDescription from './shortcut/FunctionDescription';
import { Cercel } from './ui/Cercel';



interface Iprops {
  product: Iproduct;
  setProductToedit:(product:Iproduct)=>void,
  opnEditodel :()=>void,
  idx:number
  setProductToeditidx:(value:number)=>void
  removeProductHandler:(value:string)=>void
  // removeProductHandler:()=>void
}

const ProductCard: React.FC<Iprops> = ({ product,setProductToedit ,opnEditodel,idx,setProductToeditidx,removeProductHandler}:Iprops) => {
  const { title, description, imageurl,colores, price,categorys } = product;
  const renderProductColor = colores.map((color) => (
    <Cercel key={color}  color={color} />

  ));
  

   const edit=()=>{
    setProductToedit(product)
    opnEditodel()
    setProductToeditidx(idx)
    // removeProductHandler()
  }
  return (
    <>
      <div className="flex flex-col space-y-3 border rounded-md p-2 max-w-sm mx-auto md:max-w-lg md:mx-0">
        {/* Product image */}
        <img src={imageurl} alt={title} className="mx-auto h-52 w-full object-cover" />
        
        {/* Product title */}
        <h3>{title}</h3>
        
        {/* Product description with truncation */}
        <p>{FunctionDescription(description, 50)}</p>
        
        {/* Color options */}
        <div className="flex">{renderProductColor}</div>
        <div className="text-blue-500 font-bold">$ {price}</div>
        
        {/* Price and main image */}
        <div className="flex justify-between">
          <span className="p-2 text-lg font-semibold">{categorys.name}</span>
          <MainImage src={categorys.imageURL} alt={title} />
        </div>
        {/* Action buttons */}
        
        <div className="flex justify-between ">
        <button className="w-full bg-indigo-600 p-2 rounded-md mr-2 " onClick={edit} >
          EDIT
        </button>
          <button className="w-full bg-red-500 p-2 rounded-md " onClick={removeProductHandler}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
