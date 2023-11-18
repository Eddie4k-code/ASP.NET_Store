import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../../app/models/product';
import {Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from '@mui/material'
import { caller, requests } from '../../api/caller';

export const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        id && caller.catalog.productDetail(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));


    }, []);



    if (loading) {
        return <h2>Loading Product...</h2>
    }

    if (!product) {
        return <h2>Product Not Available at this time, sorry!</h2>
    }


    return (
        
        
    <>
    
    <Grid container spacing={6}>


        <Grid item xs={6}>
            <img src={product.pictureUrl} style={{width: '100%'}} />

        </Grid>

        <Grid item xs={6}>
            <Typography variant='h3'>

                {product.name}

            </Typography>


            <Divider sx={{mb: 2}}/>

            <Typography variant='h4' color='black'>

                ${product.price / 100}

            </Typography>

            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Quantity in Stock</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>



                    </TableBody>
                </Table>
            </TableContainer>

        </Grid>


        
    </Grid>

    </>

    );
}