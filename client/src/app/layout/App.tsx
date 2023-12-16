
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
import { useAppDispatch } from '../store/configureStore';
import { setCart } from '../../features/cart/cartSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';


function App() {
  const dispatch = useAppDispatch();
  //const {setCart} = useStoreContext();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // if the user already had an existing cart we need to update that state.
    const buyerId = getCookie("buyerId");

    dispatch(fetchCurrentUser());



    setLoading(true);

    if (buyerId) {
      let userExistingCart = caller.cart.get()
        .then(cart => dispatch(setCart(cart)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }

    setLoading(false);

    


  }, [dispatch]);


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
