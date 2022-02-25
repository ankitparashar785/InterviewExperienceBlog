import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useState  } from 'react' ;
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login=()=>{


    const History=useHistory();
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');
    const[cnfmpass,setcnfmPass]=useState('');
    const {register}=useAuth();
    const auth = getAuth();
    const onsubmitHandler=()=>{
        
        if(pass!=cnfmpass)
        {
            toast.error('Password are not matching ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                return;
        }
        register(email,pass).then((response)=>{
         //   console.log(response.UserCredentialImpl )
           // UserCredentialImpl.user.sendEmailVerification();
        //   var z=JSON.stringify(response)
          // console.log(z.user.uid)
          sendSignInLinkToEmail(auth,email,{
            handleCodeInApp: true,
            url: 'http://localhost:3000/login',
           }).then(()=>{
            toast.success('Email Link sent ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
           })
           History.push('/login');
        }).catch((error)=>
           toast.error('Email Already Exist ', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        )
 
        
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Register</h2>
                </Grid>
                <TextField onChange={(e)=>{setEmail(e.target.value)}} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField onChange={(e)=>{setPass(e.target.value)}} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <TextField onChange={(e)=>{setcnfmPass(e.target.value)}}  label='Password' placeholder='Conform password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={onsubmitHandler} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>Register</Button>
                
                <Typography > Do you have an account ?
                     <Link href="/login" >
                        Login
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