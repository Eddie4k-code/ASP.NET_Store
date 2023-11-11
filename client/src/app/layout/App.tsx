import { useEffect, useState } from 'react'
import './App.css'
import { IProduct } from '../models/product';
import { Catalog } from '../../features/catalog/Catalog';
import { CssBaseline, Container } from '@mui/material';
import { Nav } from './Nav';


function App() {

  


  

const [products, setProducts] = useState<IProduct[]>([]);

useEffect(() => {

  fetch('http://localhost:5000/api/product')
    .then(response => response.json())
    .then(data => setProducts(data));

}, []);
  

  return (

    <>
    <CssBaseline />
      <Nav />
      <Container>
     <Catalog products={products} />
     </Container>
    </>

  );
}

export default App
