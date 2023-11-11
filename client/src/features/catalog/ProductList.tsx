import { Grid } from "@mui/material";
import { IProduct } from "../../app/models/product";
import { ProductCard } from "./ProductCard";


interface IProductListProps {

    products: IProduct[]

}



export const ProductList = ({products} : IProductListProps) => {
    return (

        <>


        <Grid container spacing={4}>
            {
            products.map(product =>
                <Grid item xs={4} key={product.id} > 
                <ProductCard product={product} />
                </Grid>
            )
            }
        </Grid>
        

        
        </>

    )
}