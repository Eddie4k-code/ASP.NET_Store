import {Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { IProduct } from "../../app/models/product";
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { caller } from "../../api/caller";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";

interface IProductCardProps {
    product: IProduct
}

export const ProductCard = ({product} : IProductCardProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const {setCart} = useStoreContext();

    /* Functionality to handle adding an item to a user cart */
    const onAddToCart = async (productId: number) => {
        setLoading(true);
        
        await caller.cart.addItem(productId, 1)
            .then(cart => setCart(cart))
            .catch(err => console.log(err));

        setLoading(false);
        
    }



    return (
    
    <>
    <Card>

        <CardHeader 
            title={product.name}
            titleTypographyProps={{
                sx: {fontWeight: 'bold', color: 'primary.main'}
            }}

        />

        <CardMedia 
            sx={{height: 140, backgroundSize: 'contain'}}
            image={product.pictureUrl}
            title={product.name}
        />


    <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
            ${product.price / 100 }
        </Typography>

        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
    </CardContent>

    <CardActions>
        <LoadingButton loading={loading} size="small" onClick={() => onAddToCart(product.id)}>Add to Cart</LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View Item</Button>
    </CardActions>

    </Card>

 
    
    </>

    );



}