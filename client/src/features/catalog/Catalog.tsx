
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


    if (products.length == 0) {
        return <h3>No products to load at this time...</h3>
    }
  


    return (
    <>
    <ProductList products={products} />
    </>

    );

}

