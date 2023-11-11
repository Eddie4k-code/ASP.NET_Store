import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { IProduct } from "../../app/models/product";
import { ProductCard } from "./ProductCard";


interface IProductListProps {

    products: IProduct[]

}



export const ProductList = ({products} : IProductListProps) => {
    return (

        <>


        <List>
            {
            products.map(product => 
                <ProductCard key={product.id} product={product} />
            )
            }
        </List>
        

        
        </>

    )
}