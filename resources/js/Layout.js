import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import clsx from 'clsx';

//Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

//Pages
import Dashboard from './dashboard/Dashboard';
import Register from './User/Register';
import User from './User/User';
import Schools from './schools/Schools';
import Teachers from './teachers/Teachers';
import ActiveStudents from './activeStudents/ActiveStudents';
import Transaction from './transaction/Transaction';
import Payment_h from './history/Payment_h';
import Saving_h from './history/Saving_h';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 30,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


export default function Layout() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openLogoutConfirmation, setOpenLogoutConfirmation] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfile = Boolean(anchorEl);
    const [openList, setOpenList] = React.useState(false);
    const [openListHistory, setOpenListHistory] = React.useState(false);
    
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOpenDialog = () => {
      setOpenLogoutConfirmation(true)
    }
    const handleCloseDialog = () => {
      setOpenLogoutConfirmation(false)
    }

    const logout = (event) => {
      event.preventDefault();

      axios.post('/logout',{}).then(()=>{
        window.location.href='login'
      })
    }

    const handleClick = () => {
      setOpenList(!openList);
    };
    const handleClickHistory = () => {
      setOpenListHistory(!openListHistory);
    };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{backgroundColor:"#FF6D28"}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            STUDENT SAVING MANAGEMENT SYSTEM
          </Typography>
          
          <div style={{marginLeft:'auto'}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{float:"right"}}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openProfile}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>                                 
                <MenuItem onClick = {handleOpenDialog}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => {window.location.href="/dashboard"}}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>

          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Master Data" />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => {window.location.href="/activeStudents"}}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Active Students"/>
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => {window.location.href="/schools"}}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Schools" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => {window.location.href="/teachers"}}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => {window.location.href="/user"}}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"User"}/>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button onClick={() => {window.location.href="/transaction"}}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction" />
          </ListItem>

          <ListItem button onClick={handleClickHistory}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="History" />          
            {openListHistory ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openListHistory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => {window.location.href="/saving_h"}}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Saving History" />
              </ListItem>     
              <ListItem button className={classes.nested} onClick={() => {window.location.href="/payment_h"}}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Payment History" />
              </ListItem>  
            </List>
          </Collapse>   
        </List>
      </Drawer>
  
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
            <Switch>
                <Route path='/dashboard' exact component={Dashboard}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/user' exact component={User}/>
                <Route path='/schools' exact component={Schools}/>  
                <Route path='/teachers' exact component={Teachers}/> 
                <Route path='/activeStudents' exact component={ActiveStudents}/>
                <Route path='/transaction' exact component={Transaction}/>
                <Route path='/saving_h' exact component={Saving_h}/>                       
                <Route path='/payment_h' exact component={Payment_h}/>
            </Switch>
        </Router>
      </main>

      <Dialog onClose = {() => {handleCloseDialog()}} open = {openLogoutConfirmation} fullWidth = {true} maxWidth="md">
        <DialogTitle>
          Logout Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to logging out?
        </DialogContent>
        <DialogActions>
          <Button color = "secondary" onClick = {() => {handleCloseDialog()}} >
            CANCEL
          </Button>
          <form method = 'post' onSubmit={logout}>
            <Button color = "primary" type="submit">
              YES PLEASE!
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  )
}

if (document.getElementById('apps')) {
    ReactDOM.render(<Layout />, document.getElementById('apps'));
}