
import MyModal from './compoent/ui/MOdel';
import ProductCard from './compoent/ProductCard';
import { productList, inputformList, Colors, categorys } from './compoent/data/index';
import { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { Button } from '@headlessui/react';
import { Iproduct } from "./compoent/InterFace/Interface";
import { productValidation } from './compoent/Vaildation/ProductValidatio';
import ErrorMasage from './compoent/ErrorMasage';
import { Cercel } from './compoent/ui/Cercel';
import { Select } from './compoent/ui/Select';
import { ProductName } from './type';

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imageurl: "",
    price: "",
    colores: [],
    categorys: {
      name: "",
      imageURL: "",
    }
  };

  // State for managing product input form values
  const [products, setProducts] = useState<Iproduct[]>(productList);
  const [product, setProduct] = useState<Iproduct>(defaultProduct);
  const [productToedit, setProductToedit] = useState<Iproduct>(defaultProduct);
  const [productToeditidx, setProductToeditidx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "", imageurl: "", price: "" });
  const [theColor, setColor] = useState<string[]>([]);
  const [selectedcategorys, setSelectedcategorys] = useState(categorys[0]);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const opnEditodel = () => setEdit(true);
  const closeEditMoldel = () => setEdit(false);
  const closeModel = () => {
    setProduct(defaultProduct);
    closeModal();
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToedit({
      ...productToedit,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };


  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageurl, price } = product;
    event.preventDefault();
    
    const errors = productValidation({ title, description, imageurl, price });
    const hasErrorMas = !Object.values(errors).every((value) => value === "");
    if (hasErrorMas) {
      setErrors(errors);
      return;
    }

    setProducts(prev => [{ ...product, id: uuid(), colores: theColor, categorys: selectedcategorys }, ...prev]);
    closeModal();
    setProduct(defaultProduct);
    setColor([]);
  };

  const submitEdit = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageurl, price } = productToedit;
    event.preventDefault();
    const errors = productValidation({ title, description, imageurl, price });
    const hasErrorMas = !Object.values(errors).every((value) => value === "");
    if (hasErrorMas) {
      setErrors(errors);
      return;
    }

    const updateProducts = [...products];
    updateProducts[productToeditidx] = { ...productToedit, colores: theColor.concat(productToedit.colores) };
    setProducts(updateProducts);
    closeEditMoldel();
    setProductToedit(defaultProduct);
    setColor([]);
  };
 const onremove=()=>{
  setProductToedit(product)
 }
  const removeProductHandler = () => {
    const updatedProductList = products.filter(product => product.id !== productToedit.id);
    setProducts(updatedProductList);
    onremove()
  };



  // Rendering product cards
  const render = products.map((product, idx) => (
    <ProductCard
      product={product}
      key={product.id}
      setProductToedit={setProductToedit}
      opnEditodel={opnEditodel}
      setProductToeditidx={setProductToeditidx}
      idx={idx}
      removeProductHandler={removeProductHandler}
    />
  ));

  // Rendering color selection
  const renderProductColor = Colors.map((color) => (
    <Cercel
      key={color}
      color={color}
      onClick={() => {
        if (theColor.includes(color)) {
          setColor(prev => prev.filter(item => item !== color));
          return;
        }
        if (productToedit.colores.includes(color)) {
          setColor(prev => prev.filter(item => item !== color));
          return;
        }
        setColor(prev => [...prev, color]);
      }}
    />
  ));

  // Rendering form input fields
  const renderFormList = inputformList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label className='mb-0' htmlFor={input.id}>{input.label}</label>
      <input
        type={input.type}
        id={input.id}
        name={input.name}
        className="border border-amber-300 py-3 px-4 shadow-md rounded-md focus:border-amber-500 focus:ring focus:ring-amber-200 focus:outline-none text-md"
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMasage msg={errors[input.name]} />
    </div>
  ));

  const renderProductEdit = (id: string, label: string, name: ProductName) => (
    <div className="flex flex-col">
      <label className="mb-0" htmlFor={id}>{label}</label>
      <input
        type="text"
        name={name}
        className="border border-amber-300 py-3 px-4 shadow-md rounded-md focus:border-amber-500 focus:ring focus:ring-amber-200 focus:outline-none text-md"
        value={productToedit[name]}
        onChange={onChangeEditHandler}
      />
      <ErrorMasage msg={errors[name]} />
    </div>
  );

  return (
    <>
      <main className="container mt-5">
        <div className="mt-2 flex justify-around   items-center ">
          <h1 className='font-bold border-2 border-orange-400 p-2 rounded-md'>Welcome to Product</h1>
          <span className='text-green-300 text-xl '>React project</span>
          <button className="w-fit bg-sky-500 mx-1 my-1 p-2  rounded-md" onClick={openModal}>Add new Product</button>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-4">
          {render}
        </div>
        <MyModal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
          <form className='space-y-3' onSubmit={submitHandler}>
            {renderFormList}
            <Select selected={selectedcategorys} setSelected={setSelectedcategorys} />
            <div>
              {theColor.map((color) => (
        <div className="flex flex-row ">     <span
          className='p-1 m-1 rounded-md text-white  '
          key={color}
          style={{ backgroundColor: color }}
        >
          {color}
        </span></div>
              ))}
            </div>
            <div className="flex ">{renderProductColor}</div>
            <div className="flex space-x-3 mt-3 justify-between">
              <Button className="bg-sky-500 p-3 rounded-md w-full" type='submit'>
                Submit
              </Button>
              <Button className="bg-slate-400 p-3 duration-1000 hover:bg-slate-500 rounded-md w-full" onClick={closeModel}>Cancel</Button>
            </div>
          </form>
        </MyModal>
        {/* Edit modal */}
        <MyModal isOpen={isEdit} closeModal={closeEditMoldel} title="Edit Product">
          <form className='space-y-3' onSubmit={submitEdit}>
            {renderProductEdit('titel', 'Product Title', 'title')}
            {renderProductEdit('description', 'Product Description', 'description')}
            {renderProductEdit('imageurl', 'Product Image URL', 'imageurl')}
        <div className="flex">             
            {renderProductEdit('price', 'Product Price', 'price')}
            <Select selected={productToedit.categorys} setSelected={value=>setProductToedit({...productToedit,categorys:value})} /></div>
            <div className="flex flex-wrap">{renderProductColor}</div>
            <div>
              {theColor.concat(productToedit.colores).map((color) => (
                <span
                  className='p-1 m-1 rounded-md text-white'
                  key={color}
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex space-x-3 mt-3 justify-between">
              <Button className="bg-sky-500 p-3 rounded-md w-full" type='submit'>
                Submit
              </Button>
              <Button className="bg-slate-400 p-3 duration-1000 hover:bg-slate-500 rounded-md w-full" onClick={closeEditMoldel}>Cancel</Button>
            </div>
          </form>
        </MyModal>
      </main>
    </>
  );
}

export default App;
