
import { caller } from '../../api/caller';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { signInUser } from './accountSlice';
import { AppDispatch } from '../../app/store/configureStore';
import { Alert, AlertTitle, Avatar, Box, Checkbox, Container, FormControlLabel, Grid, List, ListItem, ListItemText, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';




const defaultTheme = createTheme();

export const Register = () => {
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm();
    const [validationErrors, setValidationErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    const submitForm = async (data: FieldValues) => {

        await dispatch(signInUser(data));



        if (localStorage.getItem("user")) {
          navigate('/catalog');
        } 

    }

    function flattenErrors(errors: any) {
        return Object.values(errors).reduce((acc: any, arr) => acc.concat(arr), []);
      }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit((data) => caller.account.register(data))}  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              {...register("username", {required: true})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              id="email"
              {...register("email", {required: true})}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password", {required: true})}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {validationErrors.length > 0 && 
            <Alert severity='error'>
                <AlertTitle>Validation Errors</AlertTitle>

            <List>
            {
                validationErrors.map(error => (
                    <ListItem key={error}>

                        
                        <ListItemText>{error}</ListItemText>
                    </ListItem>
                ))
            }
            </List>
            </Alert>
            }   


            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/login">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
