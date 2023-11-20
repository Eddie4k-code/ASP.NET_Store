import {AppBar, Box, Toolbar, Typography, List, ListItem, IconButton, Badge} from "@mui/material";
import {ShoppingCart} from '@mui/icons-material'
import {Link, NavLink} from 'react-router-dom'


export const Nav = () => {

    const stylesForNav = {
        color: 'white', 
        typography: 'h6',
        '&:hover': {
            color: 'yellow'
        },
        '&.active': {
            color: 'text.secondary'
        }
        
    }


    const links: {title: string, path: string}[] = [
        {title: '', path: '/catalog'}
    ];

    const authLinks: {title: string, path: string}[] = [
        {title: 'catalog', path:'/catalog'},
        {title: 'login', path: '/login'},
        {title: 'register', path:'/register'}
    ];


    return(

    <>
    
    <AppBar position="static" sx={{mb: 4}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
        <Typography variant="h6"
        component={NavLink}
        to='/'
        sx={{color: 'inherit', textDecoration: 'none'}}
        >
            .NET Store
        </Typography>
        </Box>

        <List sx={{display: 'flex'}}
        >

            {links.map(link => 

            (

                <ListItem
                component={NavLink}
                to={link.path}
                key={link.path}
                sx={stylesForNav}
                >
                    
                    {link.title.toUpperCase()}
                </ListItem>

            )
                
                
                )}

        </List>




        <Box sx={{display: 'flex', alignItems: 'center'}}>

        

        <List sx={{display: 'flex'}}
        >

            {authLinks.map(link => 

            (

                <ListItem
                component={NavLink}
                to={link.path}
                key={link.path}
                sx={stylesForNav}
                >
                    
                    {link.title.toUpperCase()}
                </ListItem>

            )
                
                
                )}

        </List>

        <IconButton component={Link} to='/cart' size='large' edge='start' color='inherit' sx={{mr: 2}}>
                <Badge badgeContent='4'>
                <ShoppingCart />
                </Badge>
        </IconButton>

        


        </Box>


        </Toolbar>
        
    </AppBar>
      
    
    
    </>
    );



}