
import {Box,makeStyles, Typography,Grid} from '@material-ui/core'
import {Edit ,Delete,ArrowDropDown,ArrowDropUp} from '@material-ui/icons'
import { useEffect, useState } from 'react'
import {Link,useParams,useHistory} from 'react-router-dom'
import { getPost ,deletePost,updatePost} from '../../service/api'
import { useAuth } from '../../context/AuthContext'
import Comments from '../comments/Comments'

const useStyles=makeStyles((theme)=>({
   container:{
       padding:'0 100px',
       [theme.breakpoints.down('md')]: {
           padding:0
       }
   },
   image:{
      width:'100%',
      height:'50vh',
      objectFit:'cover'
   },
   icons:{
    float:'right'
   },
   icon:{
       margin:5,
       border:'1px solid #878787',
       padding:5,
       borderRadius:'10px'
   },
   heading:{
       fintSize:38,
       fontWeight:600,
       textAlign:'center',
       margin:'50px 0 10px 0 '
   },
   subheading:{
       color:'#878787',
       display :'flex',
       margin:'20px 0',
       [theme.breakpoints.down('md')]: {
           display:'block'
       }
   },
   link:{
       textDecoration:'none',
       color:'inherit'
   },
   description:{
       textAlign:'justify',
       lineHeight:1.5
   },
   arrow:{
      fontSize:100,
      height:60,
      '&:hover':{
          cursor:'pointer'
      }
      
   },
   inner1:{
       width:'95%',
       display:'flex',
       
   },
   inner2:{
       padding:'0px',
       color:'grey'
       
   },
   inner3:{
       
       marginLeft:'20px',
       marginTop:'18px'
   },
   arrowtypo:{
       textAlign:'center'
   }
}))
const DetailView=()=>{
    const [post,setPost]=useState({});
    const [visible,setVisible]=useState(true)
    const param=useParams();
    const History = useHistory();
    
    const {currentUser,liked,setLiked}=useAuth();
    //
   // console.log(param)
   const [like,setLike]=useState(0);
    useEffect(()=>{
        setLiked(liked =>!liked)
        const fetchData=async()=>{
           let data= await getPost(param.id);
          //  console.log(data);
            setPost(data)
        }
        fetchData();
      
    },[like])
  
     const updateLike=async()=>{
        //console.log(liked)
        
         //setLike(like+1)
         
         if(liked)
         {
            post.likes++;
            //await updatePost(param.id,post)
            setLiked(!liked)
         }
        
     }
  
    const deleteBlog=async()=>{
        if(currentUser.email==post.username)
        await deletePost(post._id);
        History.push('/')
    }
    const classes=useStyles();
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';    
    if(!currentUser)
    return null;
   return(
       <>
         <Box className={classes.container}>
             <img src={post.pictures || url} alt='banner' className={classes.image}/>
           <Box className={classes.icons}>
                 { post.username==currentUser.email && <Link to={`/update/${post._id}`}><Edit className={classes.icon} color='primary' /></Link>}
                 {post.username==currentUser.email && <Link><Delete onClick={() => deleteBlog()} className={classes.icon} color="error" /></Link> }  
             </Box>
             
                <Typography className={classes.heading}>
                   Title of the blog : {post.title}
                </Typography>

             <Box className={classes.subheading}>
             <Link to={`/?username=${post.username}`} className={classes.link}>
                 <Typography>Author :  {post.username}</Typography>
             </Link>
                 <Typography style={{marginLeft:'auto'}}>Pubslished on :  {new Date(post.createDate).toDateString()}</Typography>
             </Box>
             
             <Grid container>
              <Grid className={classes.inner1}>
               { post.username!=currentUser.email && <Grid className={classes.inner2}>
                 <ArrowDropUp className={classes.arrow} onClick={updateLike}></ArrowDropUp>
                    <Typography className={classes.arrowtypo} onClick={updateLike}>{0}</Typography>
                  <ArrowDropDown className={classes.arrow}></ArrowDropDown>
                </Grid>
               }
                <Grid className={classes.inner3}>
        
                <Typography className={classes.description}>
                 {post.description}
                </Typography>
                            
                </Grid>
                                  
              </Grid> 
              
             </Grid>
             <Comments post={post}/>
         </Box>
       </>
   )
}
export default DetailView;