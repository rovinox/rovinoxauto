import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import DisplayCard from "./DisplayCard";
import Header from "../header/Header";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import { Context } from "../ducks/appContext";
import Grid from "@mui/material/Grid";
export default function Home() {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const [cars, setCars] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const itemsPerPage = 6;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNumberOfPage] = useState(0);
  const [error, setError] = useState(false);

  async function getCars() {
    try {
      setLoading(true);
      const response = await axios.get("https://myfakeapi.com/api/cars/");

      setCars(response.data.cars);
      setLoading(false);
      setNumberOfPage(Math.ceil(response.data.cars.length / itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getCars();
    // if (Object.keys(store.user).length === 0) {
    //   setError(true);
    //   setTimeout(() => {
    //     setError(true);
    //     history.push("/");
    //   }, 5000);
    // } else {
    //   getCars();
    // }
  }, [store, history]);

  const handleCart = (id) => {
    let foundCar = cars.filter((c) => c.id === id);

    setCart([...foundCar, ...cart]);
  };
  const handleRemoveFromCart = (id) => {
    let foundCar = cart.filter((c) => c.id !== id);

    setCart([...foundCar]);
  };
  return (
    <>
      <Header handleRemoveFromCart={handleRemoveFromCart} cart={cart} />
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {error && (
            <Alert
              sx={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
              }}
              variant="filled"
              severity="error"
            >
              you're not logged in. please log in.
            </Alert>
          )}
          {loading && <CircularProgress />}

          {cars &&
            cars
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((car) => {
                return (
                  <DisplayCard key={car.id} handleCart={handleCart} car={car} />
                );
              })}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          alignContent: "stretch",
          width: "100vw",
        }}
      >
        {store.isDark ? (
          <Box component="span" sx={{ background: "black", color: "white" }}>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        ) : (
          <Box component="span">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    </>
  );
}
