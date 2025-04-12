/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
import React from "react";
import { useAuthContext } from "../context/authContext";
import useLogout from "../hooks/useLogout";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Home as HomeIcon, AddCircleOutline as AddCircleOutlineIcon, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";

// function Header() {
//   const { authUser } = useAuthContext();
//   const { loading, logout } = useLogout();
//   const nav = useNavigate();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "primary.dark", color: "white", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           sx={{ mr: 2 }}
//           onClick={() => nav("/home")}
//         >
//           <HomeIcon />
//         </IconButton>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
//           Civic Link
//         </Typography>
//         <Button color="inherit" sx={{ mr: 2, fontWeight: "semibold" }} onClick={() => nav("/home/post")}>
//           <AddCircleOutlineIcon sx={{ mr: 0.5 }} /> Post
//         </Button>
//         <div>
//           <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenuOpen}
//             color="inherit"
//           >
//             <Avatar alt="User Avatar" src={avatar} sx={{ width: 32, height: 32 }} />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             open={open}
//             onClose={handleMenuClose}
//             sx={{ mt: 1 }}
//           >
//             <MenuItem onClick={() => { nav("/home/profile"); handleMenuClose(); }}>
//               <AccountCircleIcon sx={{ mr: 1 }} /> Profile
//             </MenuItem>
//             <MenuItem onClick={() => { logout(); handleMenuClose(); }} sx={{ color: "error.main", fontWeight: "semibold" }}>
//               <ExitToAppIcon sx={{ mr: 1 }} /> Logout
//             </MenuItem>
//           </Menu>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// }

function Header(){
    const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
    return (
      <>
      <section className="w-screen h-[15vh] p-[1em] absolute m-[0.5em] flex justify-center items-center z-8 overflow-x-clip z-20">
        <div className=" rounded-full flex justify-around items-center bg-slate-200 px-[0.5em] lg:w-[50%] fixed">
          <div className="flex flex-row justify-center items-center p-[1em]">
        <a className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#4ba5f9] to-[#091622] bg-clip-text text-transparent" href="/">Civic Link</a>
      </div>
  
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => nav("/home")}
        >
          <HomeIcon />
      </IconButton>
          <Button color="inherit" sx={{ mr: 2, fontWeight: "semibold" }} onClick={() => nav("/home/post")}>
          <AddCircleOutlineIcon sx={{ mr: 0.5 }} /> Post
        </Button>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar alt="User Avatar" src={avatar} sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={() => { nav("/home/profile"); handleMenuClose(); }}>
              <AccountCircleIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { logout(); handleMenuClose(); }} sx={{ color: "error.main", fontWeight: "semibold" }}>
              <ExitToAppIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </div>
      </section>
    </>
    )
  }
  

export default Header;