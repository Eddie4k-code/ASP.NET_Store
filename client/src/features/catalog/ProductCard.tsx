import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { IProduct } from "../../app/models/product";

interface IProductCardProps {
    product: IProduct
}

export const ProductCard = ({product} : IProductCardProps) => {



    return (
    
    <>

    <ListItem>
        <ListItemAvatar>

            <Avatar src={product.pictureUrl}/>

        </ListItemAvatar>
                    
        <ListItemText>
            {product.name} - {product.price}
        </ListItemText>

    </ListItem>
    
    
    </>

    );



}