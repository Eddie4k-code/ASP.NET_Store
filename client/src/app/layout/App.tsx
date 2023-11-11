import { useEffect, useState } from 'react'
import './App.css'
import { IProduct } from '../models/product';
import { Catalog } from '../../features/catalog/Catalog';
import { CssBaseline, Container } from '@mui/material';
import { Nav } from './Nav';


function App() {

  


  



  return (

    <>
    <CssBaseline />
      <Nav />
      <Container>
     <Catalog />
     </Container>
    </>

  );
}

export default App
