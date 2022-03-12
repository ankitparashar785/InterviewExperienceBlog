import { AppBar,Toolbar, Typography ,makeStyles,TextField,IconButton} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import AuthContextProvider from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { SearchOutlined } from '@material-ui/icons';
import MenuBar from './MenuBar'
const useStyles=makeStyles({
   component:{
       backgroundColor:'#00ADF2',
       color:'white',
       marginBottom:'10px',
       height:'70px',
    
   },
   link:{
      textDecoration:'none',
      color:'inherit',
      
   },
   container:{
    justifyContent:'center',
    '& > *':{
          padding:20
    },

   },
   textfield:
   {
       width:300
   },
   menu:{
       background:'red'
   },
   typo:{
       fontWeight:'bold',
       fontSize:'20px'
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
              {currentUser && < Link to={'/'} className={classes.link}><Typography className={classes.typo}>Home</Typography></Link>}
                
              {!currentUser&& <Link exact to={'/login'} className={classes.link}><Typography>Login</Typography></Link>}
                {!currentUser && <Link exact to={'/register'} className={classes.link}><Typography>Register</Typography></Link>}
            <Link exact to={'/register'} className={classes.link}><Typography className={classes.typo}>About</Typography></Link>
               
               
              
                <MenuBar user={currentUser.email} className={classes.menu}/>
                
            </Toolbar>
           
         </AppBar>
     )

}
export default Header;