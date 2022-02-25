import { Grid,Paper, Avatar, TextField, Button, Typography,Link ,Snackbar} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect,useState } from 'react';
import { useAuth} from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
function useQuery(){
    const location=useLocation();
    return new URLSearchParams(location.search)
}
const ResetPasswordPage=()=>{

    const location=useLocation();
    console.log(location)
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'red'}
    const btnstyle={margin:'8px 0'}
    const[newPass,setNewPass]=useState('');
    const {resetPassword}=useAuth();
    const History=useHistory();
    const query=useQuery();
    console.log(query);
    const onclickHandler=()=>{
        resetPassword(query.get('oobCode'),newPass).then((res)=>{
           
            toast.success('Password reset successfully ', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            History.push('/login')
        }).catch((error)=>{
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        })
    }
    return(
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Reset Password</h2>
            </Grid>
            <TextField onChange={(e)=>setNewPass(e.target.value)}  label='Enter Password' placeholder='Password' fullWidth required/>
            <Button onClick={onclickHandler} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>Reset Password</Button>
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

export default ResetPasswordPage