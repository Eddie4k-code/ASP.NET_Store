
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { caller } from "../../api/caller";
import {useState, useEffect} from 'react';
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setCart, removeItem } from "./cartSlice";


export const CartPage = () => {

  const dispatch = useAppDispatch();
  const {cart} = useAppSelector(state => state.cart);
  const [loading, setLoading] = useState<boolean>(false);

    
   

    //functionality to handle increasing the quantity on an item.
    const onQuantityIncrease =  (productId: number) => {
      setLoading(true);
      caller.cart.addItem(productId, 1)
        .then(cart => dispatch(setCart(cart)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }


    const onRemoveItem = (productId: number, quantity: number) => {
      setLoading(true);
      caller.cart.removeItem(productId, quantity)
        .then(() => dispatch(removeItem({productId, quantity})))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }


    if (!cart) {
      return <Typography variant="h3">Cart is Empty!</Typography>
  }
  
    return (

        <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <IconButton color='error' onClick={() => onRemoveItem(item.productId, 1)}>
                    <Remove />
                </IconButton>
                {item.quantity}
                <IconButton color='secondary' onClick={() => onQuantityIncrease(item.productId)}>
                    <Add />
                </IconButton>
                </TableCell>
              <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color="error" onClick={() => onRemoveItem(item.productId, item.quantity)}>
                    <Delete />
                </IconButton>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>

    );

}