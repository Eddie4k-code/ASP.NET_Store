
import './App.css'
import { CssBaseline, Container } from '@mui/material';
import { Nav } from './Nav';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {




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
