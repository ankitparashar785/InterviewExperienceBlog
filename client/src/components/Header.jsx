import { AppBar,Toolbar, Typography ,makeStyles,TextField,IconButton} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import AuthContextProvider from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { SearchOutlined } from '@material-ui/icons';
const useStyles=makeStyles({
   component:{
       backgroundColor:'aqua',
       color:'black'
   },
   link:{
      textDecoration:'none',
      color:'inherit'
   },
   container:{
    justifyContent:'center',
    '& > *':{
          padding:20
    }
   },
   textfield:
   {
       width:300
   }
})
const Header=()=>{
    const classes=useStyles();
    const History=useHistory()
    const {currentUser,logout,isSuccess}=useAuth();
    const [visible ,setVisible]=useState(false)
    const r= localStorage.getItem('email');
    //console.log(r)
    if(!currentUser && r!='')
    return null;
   // var z=JSON.stringify(currentUser,null);
   // console.log(z);
   /* if(!z.emailVerified)
    {
        return null;
    }*/
   
   // console.log(isSuccess)
     return(
         <AppBar className={classes.component}>
        
            <Toolbar className={classes.container}>
              {currentUser && < Link to={'/'} className={classes.link}><Typography>Home</Typography></Link>}
                
              {!currentUser&& <Link exact to={'/login'} className={classes.link}><Typography>Login</Typography></Link>}
                {!currentUser && <Link exact to={'/register'} className={classes.link}><Typography>Register</Typography></Link>}
               <Typography>{ currentUser && currentUser.email}</Typography>
        
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
                
                <TextField
                
                className={classes.textfield}
                id="standard-bare"
                variant="outlined"
                placeholder="Search article by author name"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
            </Toolbar>
           
         </AppBar>
     )

}
export default Header;