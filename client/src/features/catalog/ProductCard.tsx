import {Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { IProduct } from "../../app/models/product";
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { caller } from "../../api/caller";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, setCart } from "../cart/cartSlice";

interface IProductCardProps {
    product: IProduct
}

export const ProductCard = ({product} : IProductCardProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.cart);



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
        <LoadingButton loading={status.includes('pending')} size="small" onClick={() => dispatch(addCartItemAsync({productId: product.id, quantity: 1}))}>Add to Cart</LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>Views Item</Button>
    </CardActions>

    </Card>

 
    
    </>

    );



}