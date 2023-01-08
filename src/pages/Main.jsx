import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/toastify";
// import MovieCard from "../components/MovieCard";

const API_KEY = "a9a90e58da935e5528540782b69aa0cf"
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {currentUser} = useContext(AuthContext);

useEffect(() => {
  getMovies(FEATURED_API)
}, [])


const getMovies = async(API) => {
  setLoading(true);
  try {
    const {data} =await axios.get(API)
    setMovies(data.results)
    console.log(data.results)
  } catch (error) {
    console.log(error);
  } finally{
  setLoading(false)
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  if(searchTerm && currentUser){
    getMovies(SEARCH_API + searchTerm)
  }else if (!currentUser) {
    toastWarnNotify('Please log in to search a movie');
  } else {
    toastWarnNotify('Please enter a text');
  }
}

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
        onSubmit={handleSubmit}
        >
            <TextField
              sx={{width:400}}
              id="text"
              label="Search Movie"
              name="text"
              autoComplete="text"
              autoFocus
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 2, padding:"0.8rem"}}
            >
              Search
            </Button>
          </Box>
          <Box >
              {loading ? (
                <div className="spinner-border text-primary m-5" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
              
                movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)
              )}
          </Box>
      </>
  );
};

export default Main;
