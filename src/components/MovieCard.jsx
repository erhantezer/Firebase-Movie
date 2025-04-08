import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
import { toastWarnNotify } from '../helpers/toastify';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const IMG_API = 'https://image.tmdb.org/t/p/w1280';
const defaultImage =
  'https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80';

export default function MovieCard({poster_path, title, overview, vote_average, id,release_date}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const {currentUser} = React.useContext(AuthContext)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const setVoteClass = (vote) => {
    if (vote > 8) {
      return 'green';
    } else if (vote >= 6) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    
    <Card 
      key={id} 
      sx={{ 
      width: 345,
      display:"inline-block",
      // marginTop:"8rem", 
      // marginBottom:"2rem",
      margin:"3rem 0 2rem 2rem"
    }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            ET
          </Avatar>
        }
        title={title}
        subheader={release_date}
        sx={{
          // bgcolor:"coral",
          height:"90px"
        }}
      />
      <Button>
      <CardMedia
        component="img"
        height="500"
        image={poster_path ? (IMG_API + poster_path) : (defaultImage)}
        alt="Paella dish"
        onClick={() => {
          navigate(`/details/${id}`);
          !currentUser && toastWarnNotify('Please log in to see detail');
        }}
      />
      </Button>
      <CardContent>
        <Typography variant="body2" color="text.secondary" >
          Created by Erhan TEZER
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{color:`${setVoteClass(vote_average)}`}}>
          {vote_average.toFixed(0)}
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
              {overview}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
    
  );
}