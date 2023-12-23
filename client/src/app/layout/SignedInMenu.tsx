import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../store/configureStore";
import { useDispatch } from "react-redux";
import { logout } from "../../features/account/accountSlice";

export const SignedInMenu = () => {



const {user} = useAppSelector(state => state.account);
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const dispatch = useDispatch();
const handleClick = (event: React.MouseEvent<HTMLElement>) => {
setAnchorEl(event.currentTarget);
};
const handleClose = () => {
setAnchorEl(null);
};

  return (
    <div>
      <Button 
      onClick={handleClick}
      color='inherit'
      sx={{typography: 'h6'}}
      
      >
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Orders</MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </div>
  );




}