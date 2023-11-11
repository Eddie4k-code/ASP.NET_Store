import {Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { IProduct } from "../../app/models/product";

interface IProductCardProps {
    product: IProduct
}

export const ProductCard = ({product} : IProductCardProps) => {



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
        <Button size="small">Add to Cart</Button>
        <Button size="small">View Item</Button>
    </CardActions>

    </Card>

 
    
    </>

    );



}