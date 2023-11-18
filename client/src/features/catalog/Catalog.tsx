
import { useState, useEffect } from "react";
import { IProduct } from "../../app/models/product";
import { ProductList } from "./ProductList";
import { caller } from "../../api/caller";




export const Catalog = () => {

    const [products, setProducts] = useState<IProduct[]>([]);


    useEffect(() => {
        // Fetch all products to show on catalog.
        caller.catalog.list().then(data => setProducts(data));

    }, []);
  


    return (
    <>
    <ProductList products={products} />
    </>

    );

}

