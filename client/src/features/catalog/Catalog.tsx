
import React, { useState, useEffect } from "react";
import { IProduct } from "../../app/models/product";
import { ProductList } from "./ProductList";
import { caller, getAxiosProductParams } from "../../api/caller";
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { IPagination } from "../../app/models/pagination";
import { AppPagination } from "./AppPagination";


const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to Low'},
    {value: 'price', label: 'Price - Low to High'}
]

export const Catalog = () => {

    

    const [products, setProducts] = useState<IProduct[]>([]);
    const [sortOption, setSortOption] = useState<string>(sortOptions[0].value);
    const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
    const [pageNumber, setPagenumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(6);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const params = getAxiosProductParams({
            pageNumber: pageNumber,
            pageSize: pageSize,
            orderBy: sortOption,
            searchTerm,
        });

        // Fetch all products to show on catalog.
        caller.catalog.list(params).then((response) => {
            setProducts(response.data);
            const pagination: IPagination = JSON.parse(
                response.headers['pagination']
            );
            setPagenumber(pagination.CurrentPage);
            setTotalPages(pagination.TotalPages);
        });
    }, [searchTerm, sortOption, pageNumber]);

    const handleSearchTermChange = (term: string) => {
        // Reset the page number to 1 when the search term changes
        setSearchTerm(term);
        setPagenumber(1);
    };


    if (products.length == 0) {
        return (<Grid container>
        <Grid container spacing={4}>
    
            <Grid item xs={3}>
    
                <Paper sx={{mb: 2}}>
    
                    <TextField onChange={(e) => handleSearchTermChange(e.target.value)}label="Search Products" variant="outlined" fullWidth/>
    
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
                    <Paper sx={{ mb: 2 }}>
                        <TextField
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            label="Search Products"
                            variant="outlined"
                            fullWidth
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                Sort
                            </FormLabel>
                            <RadioGroup>
                                {sortOptions.map((option) => (
                                    <FormControlLabel
                                        onClick={() =>
                                            setSortOption(option.value)
                                        }
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <AppPagination
                            totalPages={totalPages}
                            pageNumber={pageNumber}
                            onPageChange={(page) => setPagenumber(page)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
