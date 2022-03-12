import * as React from 'react';
import { Box,Avatar,Menu,MenuItem,ListItemIcon,Divider,IconButton,Typography,Tooltip } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
const useStyles=makeStyles({
    link:{
        textDecoration:'none',
        color:'inherit'
     }
})
export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
//  console.log(props)
let s= (props.user[0]).toUpperCase();;
//console.log(s)
const classes=useStyles();
const {logout}=useAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{s}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />{props.user}
        </MenuItem>
        <Divider />
        <MenuItem>
            <Link exact to={'/login'} className={classes.link}
                 onClick={(e)=>{
                     e.preventDefault();
                     localStorage.removeItem('email')
                     logout();
                     History.push('/login')
                 }}
                
                >
                   <Typography>Logout</Typography>
                </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
