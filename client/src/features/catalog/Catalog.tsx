
import React, { useState, useEffect } from "react";
import { IProduct } from "../../app/models/product";
import { ProductList } from "./ProductList";
import { caller, getAxiosProductParams } from "../../api/caller";
import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from "@mui/material";


const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to Low'},
    {value: 'price', label: 'Price - Low to High'}
]

export const Catalog = () => {

    

    const [products, setProducts] = useState<IProduct[]>([]);
    const [sortOption, setSortOption] = useState<string>(sortOptions[0].value);
    const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
    const [paginationInfo, setPaginationInfo] = useState({
        pageNumber : 1,
        pageSize: 6
    });


    useEffect(() => {

        const params = getAxiosProductParams({pageNumber: paginationInfo.pageNumber, pageSize: paginationInfo.pageSize, orderBy: sortOption, searchTerm});

        // Fetch all products to show on catalog.
        caller.catalog.list(params)
            .then(data => setProducts(data));

    }, [searchTerm, sortOption]);


    if (products.length == 0) {
        return (<Grid container>
        <Grid container spacing={4}>
    
            <Grid item xs={3}>
    
                <Paper sx={{mb: 2}}>
    
                    <TextField onChange={(e) => setSearchTerm(e.target.value)}label="Search Products" variant="outlined" fullWidth/>
    
                </Paper>
    
                <Paper sx={{mb:2, p:2}}>
    
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sort</FormLabel>
                    <RadioGroup >
                        {sortOptions.map(option => 
    
                        <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
    
                        )}
                     </RadioGroup>
                </FormControl>
    
                </Paper>
    
            </Grid>
    
            <Grid item xs={9}>
            <h3>No products to load at this time...</h3>
    
            </Grid>
    
    
    
        </Grid>
        </Grid>);
    
    }
  


    return (
    <Grid container>
    <Grid container spacing={4}>

        <Grid item xs={3}>

            <Paper sx={{mb: 2}}>

                <TextField onChange={(e) => setSearchTerm(e.target.value)}label="Search Products" variant="outlined" fullWidth/>

            </Paper>

            <Paper sx={{mb:2, p:2}}>

            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Sort</FormLabel>
                <RadioGroup >
                    {sortOptions.map(option => 

                    <FormControlLabel onClick={() => setSortOption(option.value)} value={option.value} control={<Radio />} label={option.label} />

                    )}
                 </RadioGroup>
            </FormControl>

            </Paper>

        </Grid>

        <Grid item xs={9}>
        <ProductList products={products} />


        </Grid>



    </Grid>
    </Grid>


    );

}

