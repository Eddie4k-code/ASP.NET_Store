import { useEffect, useState } from 'react'
import './App.css'
import { IProduct } from '../models/product';
import { Catalog } from '../../features/catalog/Catalog';
import { Typography } from '@mui/material';


function App() {

  


  

const [products, setProducts] = useState<IProduct[]>([]);

useEffect(() => {

  fetch('http://localhost:5000/api/product')
    .then(response => response.json())
    .then(data => setProducts(data));

}, []);
  

  return (

    <div>
      <Typography variant="h1">.NET Store</Typography>
     <Catalog products={products} />
    </div>

  );
}

export default App
