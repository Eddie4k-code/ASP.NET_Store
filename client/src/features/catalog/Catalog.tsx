
import { useState, useEffect } from "react";
import { IProduct } from "../../app/models/product";
import { ProductList } from "./ProductList";




export const Catalog = () => {

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {

    fetch('http://localhost:5000/api/product')
        .then(response => response.json())
        .then(data => setProducts(data));

    }, []);
  


    return (
    <>
    <ProductList products={products} />
    </>

    );

}

