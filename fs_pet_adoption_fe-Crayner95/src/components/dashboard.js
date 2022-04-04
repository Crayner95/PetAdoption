import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useHistory } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useContext } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { UserContext } from '../App';
import { FaPaw } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import { GiDogBowl } from 'react-icons/gi'


const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {

    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function Dashboard(props) {
    const [openIcon, setOpenIcon] = React.useState(true);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
   
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = () => {
        setOpenIcon(!openIcon);
    };

    const handleLogout = async () => {
        // eslint-disable-next-line no-console
        try {
            const response = await axios.get('/api/logout');
            setUser(null);
            history.push('/logout');
        } catch (err) {
            alert("something went wrong");
        }
    };


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/"> Paws </Link>
                        </Typography>
                        {user && (
                            <Typography sx={{ mr: 2 }}>Hello, {user.firstName}!</Typography>
                        )}
                        {user && (
                            <Button onClick={handleLogout} style={{ color: 'inherit', textDecoration: 'inherit', textTransform: 'inherit', margin: "10px" }}>Log Out</Button>
                        )}
                        {!user && (
                            <Link style={{ color: 'inherit', textDecoration: 'inherit', textTransform: 'inherit' }} to="/login">Log In</Link>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    {user && (<ListItem button onClick={() => history.push("/search")}>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItem>)}
                    <ListItem button onClick={() => history.push("/")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>

                  {user && (<ListItem button onClick={() => history.push("/profile")}>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>)}
                    {user && (<ListItem button onClick={() => history.push("/pets")}>
                        <ListItemIcon>
                            <FaPaw/>
                        </ListItemIcon>
                        <ListItemText primary="MyPets" />
                    </ListItem>)}
                    {user ?.isAdmin && (<ListItemButton onClick={handleClick} sx={{ flexGrow: 0 }}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                        {openIcon ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>)}
                    {user?.isAdmin && (<Collapse in={openIcon} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => history.push('/addpet')}>
                                <ListItemIcon>
                                    <GiDogBowl />
                                </ListItemIcon>
                                <ListItemText primary="Add Pets" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => history.push('/manageuser')}>
                                <ListItemIcon>
                                    <BiUser />
                                </ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItemButton >
                        </List>
                    </Collapse>)}
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <main>
                        {props.children}
                    </main>
                </Box>
            </Box >
        </ThemeProvider >
    );
}



