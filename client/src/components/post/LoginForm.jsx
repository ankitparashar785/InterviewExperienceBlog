import { Grid,Paper, Avatar, TextField, Button, Typography,Link ,Snackbar,CircularProgress} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect,useLayoutEffect,useState } from 'react';
import { useAuth} from '../../context/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login=()=>{

    const {currentUser, login,isSuccess}=useAuth();
    const History=useHistory();
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');
    const [submit,setSubmit]=useState(false)
    const location =useLocation();
   // if(currentUser)
   
   // console.log(currentUser.emailVerified)
    const onsubmitHandler=()=>{
     //  e.preventDefault();
     setSubmit(true)
     setTimeout(()=>{

        login(email,pass).then((response)=>{

            //  console.log(currentUser)
            
            //  window.localStorage.setItem('email',email);
          
              History.push(location.state?.from && '/');
              
              
          }).catch((error)=>
              
              toast.error('Email or Password are not matched', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              }),
              setSubmit(false)
          )
     },2000)
    
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField onChange={(e)=>{setEmail(e.target.value)}} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField onChange={(e)=>{setPass(e.target.value)}} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={onsubmitHandler} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>{!submit && `Login` } { submit && <CircularProgress color="inherit" />}</Button>
                 
                <Typography >
                     <Link href="/forgotPassword"  >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you not have an account ?
                     <Link href="/register" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
            <ToastContainer
             position="top-center"
              autoClose={5000}
             hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
              rtl={false}
            pauseOnFocusLoss
           draggable
           pauseOnHover
               />
        </Grid>
    )
}

export default Login