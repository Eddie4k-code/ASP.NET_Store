
import { IProduct } from "../../app/models/product";
import { ProductList } from "./ProductList";

interface ICatalogProps {

    products: IProduct[]

}


export const Catalog = ({products} : ICatalogProps) => {

    return (
    <>
    <ProductList products={products} />
    </>

    );

}

