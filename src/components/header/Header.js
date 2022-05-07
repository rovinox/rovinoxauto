import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Context } from "../ducks/appContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header({ cart, handleRemoveFromCart }) {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [cartPopoverEl, setCartPopoverEl] = React.useState(false);
  const [accountPopoverEl, setAccountPopoverEl] = React.useState(false);

  const handleAccountPopover = (event) => {
    setAccountPopoverEl(event.currentTarget);
  };

  const handleCloseAccountPopover = () => {
    setAccountPopoverEl(null);
  };
  const handleCartPopover = (event) => {
    setCartPopoverEl(event.currentTarget);
  };

  const handleCloseCartPopover = () => {
    setCartPopoverEl(null);
  };
  const handleLogout = () => {
    history.push("/");
  };

  // const cartOpen = Boolean(cartPopoverEl);
  // const cartId = cartOpen ? "simple-popover" : undefined;
  // const accountOpen = Boolean(cartPopoverEl);
  // const accountId = accountOpen ? "simple-popover" : undefined;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="mode" placement="bottom">
              <IconButton
                size="large"
                edge="end"
                aria-label="mode"
                aria-haspopup="true"
                onClick={() => actions.changeMode()}
                color="inherit"
              >
                <DarkModeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleCartPopover}
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Popover
              //id={cartId}
              open={cartPopoverEl}
              anchorEl={cartPopoverEl}
              onClose={handleCloseCartPopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List>
                {cart.length === 0 ? (
                  <Typography sx={{ width: 200, textAlign: "center" }}>
                    {" "}
                    You have no item
                  </Typography>
                ) : (
                  cart.map((car) => (
                    <>
                      <ListItem sx={{ width: 200 }} key={car.id}>
                        {car.car}
                        <IconButton
                          style={{ marginLeft: 50 }}
                          size="large"
                          edge="end"
                          aria-label="account of current user"
                          aria-haspopup="true"
                          onClick={() => {
                            handleRemoveFromCart(car.id);
                          }}
                          color="inherit"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </>
                  ))
                )}
              </List>
            </Popover>
            <Tooltip title="Account" placement="bottom">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleAccountPopover}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" placement="bottom">
              <IconButton
                size="large"
                edge="end"
                aria-label="logOut"
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Popover
              //id={accountId}
              open={accountPopoverEl}
              anchorEl={accountPopoverEl}
              onClose={handleCloseAccountPopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ width: 200, textAlign: "center" }}>
                {" "}
                Hello, {store.user.firstName} {store.user.lastName}
              </Typography>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
