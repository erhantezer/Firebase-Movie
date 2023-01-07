import { Box, Button, TextField } from "@mui/material";
import React from "react";
// import MovieCard from "../components/MovieCard";

const Main = () => {
  return (
      <>
        <Box 
          component="form" 
          noValidate 
          sx={{
          marginTop:"6rem", 
          display:"flex", 
          justifyContent:"center", 
          alignItems:"center" 
        }}
        >
            <TextField
              sx={{width:400}}
              id="text"
              label="Search Movie"
              name="text"
              autoComplete="text"
              autoFocus
              // onChange={(e) => setEmail(e.target.value)}
            />
          
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 2, padding:"0.8rem"}}
            >
              Search
            </Button>
          </Box>
      </>
  );
};

export default Main;
