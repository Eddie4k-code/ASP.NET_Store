
import './App.css'
import { Catalog } from '../../features/catalog/Catalog';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import { Nav } from './Nav';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';


function App() {

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType
    }
  });

  


  



  return (

    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Nav />
      <Container>
        <Outlet />
     </Container>
     </ThemeProvider>
    </>

  );
}

export default App
