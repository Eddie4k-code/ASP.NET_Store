
import './App.css'
import { CssBaseline, Container, Typography } from '@mui/material';
import { Nav } from './Nav';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { useEffect, useState } from 'react';
import { getCookie } from '../util/util';
import { caller } from '../../api/caller';


function App() {

  const {setCart} = useStoreContext();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // if the user already had an existing cart we need to update that state.
    const buyerId = getCookie("buyerId");

    setLoading(true);

    if (buyerId) {
      let userExistingCart = caller.cart.get()
        .then(cart => setCart(cart))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    


  }, [setCart]);


  if (loading) {
    return <Typography variant="h3">Loading App...</Typography>
  }





  return (

    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline />
      <Nav />
      <Container>
        <Outlet />
     </Container>
    </>

  );
}

export default App
