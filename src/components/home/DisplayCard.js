import React from "react";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import convertCssColorNameToHex from "convert-css-color-name-to-hex";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
export default function DisplayCard({ car, handleCart }) {
  return (
    <Grid item xs={12} sm={6} md={9} lg={4}>
      <Card
        sx={{
          minWidth: 250,
          margin: 1,
          borderLeft: `10px solid ${convertCssColorNameToHex(car.car_color)}`,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Make: {car.car}
          </Typography>
          <Typography variant="h5" component="div">
            Year: {car.car_model_year}
          </Typography>
          <Typography variant="h5" component="div">
            model : {car.car_model}
          </Typography>
          <Typography variant="h5" component="div">
            color : {car.car_color}{" "}
          </Typography>
          <Typography variant="h5" component="div">
            VIN: {car.car_vin}
          </Typography>
          <Typography variant="h5" component="div">
            available: {car.availability ? "Yes" : "No"}
          </Typography>
          <Typography variant="h5" component="div">
            Price: {car.price}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => {
              handleCart(car.id);
            }}
            color="inherit"
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
