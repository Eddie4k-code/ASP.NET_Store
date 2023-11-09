import { useEffect, useState } from 'react'
import './App.css'

interface IProduct {

  name: string
  price: number

}

function App() {

  


  

const [products, setProducts] = useState<IProduct[]>([]);

useEffect(() => {

  fetch('http://localhost:5000/api/product')
    .then(response => response.json())
    .then(data => setProducts(data));

}, []);
  

  return (

    <>
      <ul>
        {
          products.map(product => 
            <li>{product.name}</li>
          )
        }
      </ul>
    </>

  );
}

export default App
