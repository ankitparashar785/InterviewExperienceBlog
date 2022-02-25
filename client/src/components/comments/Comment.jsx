
import { Typography,Box,makeStyles ,Grid} from "@material-ui/core";
import { Delete, ImageOutlined } from "@material-ui/icons";
import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../service/api";
import { Link } from "react-router-dom";
const useStyles=makeStyles({
    component:{
      marginTop:'30px',
      background:'#F5F5F5',
      padding:'10px',
      borderRadius:'10px'
    },
    container:{
      display:'flex',
      marginBottom:10,
      
    },
    name:{
        fontWeight:'bold',
        color:'green'
    },
    date:{
        color:'#878787',
        marginLeft :20
    },
    delete:{
        color:'red',
        marginLeft:'auto',
        '&:hover' : {    
            cursor:'pointer !important'
        }
    },
    comment:{
        textAlign:'justify'
    }
   
})
const Comment=({comment,setToggle})=>{
    const classes=useStyles();
    const {currentUser}=useAuth();
    const removeComment=async()=>{
         
            await deleteComment(comment._id);
             setToggle(prev =>!prev)
         
    }
    return (
        <Box className={classes.component}>
          <Box className={classes.container}>
            <Grid container>
            <Typography xs={12} className={classes.name}>
                {comment.name}
            </Typography>
            <Typography xs={12} className={classes.date}>
                {new Date(comment.date).toDateString()}
            </Typography>
            </Grid>
            { comment.name==currentUser.email && <Delete onClick={removeComment} className={classes.delete}></Delete>}
           </Box>
            <Typography className={classes.comment}
             
            >
                {comment.comments}
            </Typography>
        </Box>
    )
}
export default Comment;