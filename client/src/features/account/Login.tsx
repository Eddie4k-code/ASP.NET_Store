import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { caller } from '../../api/caller';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { signInUser } from './accountSlice';
import { AppDispatch } from '../../app/store/configureStore';



const defaultTheme = createTheme();

export const Login = () => {
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    const submitForm = async (data: FieldValues) => {

        await dispatch(signInUser(data));
        navigate('/catalog');

    }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)}  noValidate sx={{ mt: 1 }}>
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
              label="Password"
              type="password"
              id="password"
              {...register("password", {required: true})}
              error={!!errors.password}
              helperText={errors?.username?.message as string}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
