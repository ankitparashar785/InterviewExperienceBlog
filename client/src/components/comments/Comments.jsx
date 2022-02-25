
import { Box, Button, TextareaAutosize,makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { newComment ,getComments} from "../../service/api";
import { useAuth } from "../../context/AuthContext";
import Comment from "./Comment";
const useStyles=makeStyles({
   component:{
       marginTop:100,
       display:'flex'
   },
   image:{
       width:50,
       height:50,
       borderRadius:'50%'
   },
   textarea:{
       width:'100%',
       margin:'0 20px',
       fontSize:'20px',
       padding:'10px 20px',
       textAlign:'justify'
   },
   button:{
       height:'40px',
       background:'green'
   }
})
const initialValues={
    name:'',
    postId:'',
    date:new Date(),
    comments:''
}
const Comments=({post})=>{
    //console.log(post)
    const url='https://static.thenounproject.com/png/12017-200.png'
    const {currentUser}=useAuth();
    const classes=useStyles();
    const [comment,setComment]=useState(initialValues);
    const [comments,setComments]=useState([])
    const[toggle,setToggle]=useState(false);
    const [data, setData] = useState('');
    useEffect(()=>{
       const getData=async ()=>{
          const res= await getComments(post._id)
          setComments(res)
       }
       getData();
      // console.log(comments)
    },[post,toggle])
   
    const handleChange=(e)=>{
        setComment({
            ...comment,
            name:currentUser.email,
            postId:post._id,
            comments:e.target.value
        })
        setData(e.target.value)
    }
    const addComment=()=>{
        try{
           newComment(comment);
           setData('')
          // console.log("Hello")
           setToggle(prev =>!prev)
           //console.log(toggle)
        }catch(error){
          console.log(error)
        }

       
    }
    return (
        <Box>
            <Box className={classes.component}>
               <img src={url} alt="dp" className={classes.image}/>
               <TextareaAutosize 
               minRows={5}
               className={classes.textarea}
               onChange={(e)=>handleChange(e)}
                value={data}
                placeholder="Start typing your comment"
               />
               <Button onClick={(e)=>addComment()} variant="contained" color="primary" size="medium" className={classes.button}>
                  Comment
               </Button>
            </Box>
             <Box>
             <Box>
                {
                    comments && comments.map((comment,index) => (
                        <Comment key={index} comment={comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
             </Box>
        </Box>
    )
}
export default Comments;