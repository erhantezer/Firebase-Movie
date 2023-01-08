import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../auth/firebase';

const drawerWidth = 240;


function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate()

  const { currentUser } = React.useContext(AuthContext)
 console.log(currentUser)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Button
      sx={{ my: 2, fontSize:"1.5rem" }}
      onClick={() => currentUser && (navigate("/"))}
      >
        MUI
      </Button> 
      <Divider />
      <List>
        
          <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center'}}>
            {currentUser ? (
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText onClick={() => logOut(navigate)} primary="Logout" />
            </ListItemButton>
            ):
            (<>
              <ListItemButton sx={{ textAlign: 'center'}}>
              <ListItemText sx={{
              // mt:"5",
              bgcolor:"#fff",
              // padding:"0.5rem",
              borderRadius:"1rem",
              }} onClick={() => navigate("/login")} primary="Login" />
              </ListItemButton>

              <ListItemButton sx={{ textAlign: 'center'}}>
              <ListItemText sx={{
              // marginTop:"2rem",
              bgcolor:"#fff",
              borderRadius:"1rem",
              // padding:"0.5rem"
              }} onClick={() => navigate("/register")} primary="Register" />
              </ListItemButton>
            </>
            )}
            </ListItemButton>
            
          </ListItem>
        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          
            <Button  sx={{ color: '#fff',fontSize:"2rem" }} onClick={() => currentUser && navigate("/")}>
            MUI
          </Button>
            {/* <Link to={"/"}>
              MUI
            </Link> */}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {currentUser ? (
            <>
            <Box sx={{flexGrow: 1}}>
            <Typography variant='h6' sx={{ 
                display:"inline-block",
                mr:5,
                textAlign:"center" }}
            >
              {currentUser.displayName}
            </Typography>
              <Button onClick={() => logOut(navigate)} sx={{ color: '#fff' }}>
                Logout
              </Button>
              </Box>
            </>
              

            ) : (
              <>
                <Button onClick={() => navigate("/login")} sx={{ color: '#fff' }}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")} sx={{ color: '#fff' }}>
                  Register
                </Button>
              </>
            )

            }

          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;