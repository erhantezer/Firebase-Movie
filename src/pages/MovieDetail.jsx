import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import VideoSection from '../components/VideoSection';
import { Box, Button } from '@mui/material';



export default function MovieDetail() {
  const [movieDetails, setMovieDetails] = React.useState("");
  const [videoKey, setVideoKey] = React.useState("");
  const [video, setVideo] = React.useState(false);
  

const {id} = useParams();


const API_KEY = "a9a90e58da935e5528540782b69aa0cf"
const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
const baseImageUrl = 'https://image.tmdb.org/t/p/w1280';
const defaultImage ='https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80';


React.useEffect(() => {
  axios
    .get(movieDetailBaseUrl)
    .then((res) => setMovieDetails(res.data))
    .catch((err) => console.log(err));
  axios
    .get(videoUrl)
    .then((res) => setVideoKey(res.data.results[0].key))
    .catch((err) => console.log(err));
    
}, []);

const {
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  vote_count,
} = movieDetails;

console.log(videoKey)
  return (

    <Box >
    {!video ? (
        <Card sx={{ 
    maxWidth: 1000,
    margin:"auto",
    marginTop:"5rem", 
    height:500,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
    }}>
      
      <CardMedia
        sx={{ height: 500,width:800 }}
        image={poster_path ? baseImageUrl + poster_path : defaultImage}
        title={title}
      />
      <CardContent >
        <Typography sx={{marginBottom:"30px"}} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{marginBottom:"30px"}} variant="body2" color="text.secondary">
          {overview}
        </Typography>
      
      <CardActions sx={{marginTop:"30px"}}>
        <Typography sx={{marginRight:"30px"}} size="small">{'Release Date : ' + release_date}</Typography>
        <Typography sx={{marginRight:"30px"}} size="small">{'Rate : ' + vote_average}</Typography>
        <Typography size="small">{'Total Vote : ' + vote_count}</Typography>
      </CardActions>
      <Typography sx={{marginTop:"30px", bgcolor:"coral",width:"5rem", padding:"0.5rem", borderRadius:"1rem"}}>
        <Link to={-1} className="card-link">
              Go Back
        </Link>
      </Typography>
        
        </CardContent>
  
    </Card>
    ): (
    <Box 
    sx={{ 
    maxWidth: 1000,
    margin:"auto",
    marginTop:"5rem", 
    height:500,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
    }}
    >
          {videoKey && <VideoSection videoKey={videoKey} />} 
    </Box>
    )}



    <Button sx={{
    margin:"auto",
    bgcolor:"lightblue", 
    color:"black", 
    display:"flex", 
    justifyContent:"center",
    alignItems:"center"
    }} onClick={() => setVideo(!video)}>
     {!video ? "VIDEO" : "VIEW"}
    </Button> 
    </Box>
    );
}