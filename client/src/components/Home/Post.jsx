
import { Box,Typography ,makeStyles} from "@material-ui/core";

const useStyles=makeStyles({
    container:{
        height:'350px',
        margin:10,
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        '& >*':{
            padding :'0 5px 5px 5px'
        },
        boxShadow:' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
        
    },
    image:{
        height:150,
        width:'95%',
        objectFit:'cover',
        marginTop:5
    },
    text1:{
      color:'red',
      fontSize:25,
      fontWeight:'bold'
    },
    text:{
        color:'#878787', 
    },
    detail:{
        wordBreak:'break-word',
        textAlign:'justify',
        padding:20
    },
    heading:{
        textAlign:'center'
    }
})
const Post=({post})=>{
    
    const classes=useStyles();
    //console.log(post)
    const addElipsis=(str)=>{
       return str.length >80 ? str.substring(0,80)+'...':str
    }
    const url=post.pictures || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    return (
      <>
         <Box className={classes.container}>
            < img src={url} alt="wrapper" className={classes.image}/>
            <Typography className={classes.text1}>{post.categories}</Typography>
            
            <Typography className={classes.text}>Author : {post.username}</Typography>
            <Typography className={classes.detail}>{addElipsis(post.description)}</Typography>
         </Box>
      </>
   )
}
export default Post;