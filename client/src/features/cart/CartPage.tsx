
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { caller } from "../../api/caller";
import { ICart } from "../../app/models/cart";
import {useState, useEffect} from 'react';
import { Delete } from "@mui/icons-material";

export const CartPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [cart, setCart] = useState<ICart | null>(null);

    useEffect(() => {
        caller.cart.get()
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    if (loading) {
        return <h3>Loading Cart...</h3>
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
            <TableCell align="right">Quantity</TableCell>
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
                {item.name}
              </TableCell>
              <TableCell align="right">{(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color="error">
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