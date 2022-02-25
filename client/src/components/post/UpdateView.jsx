
import {Button, Box,makeStyles,FormControl, InputBase ,TextareaAutosize} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPost,updatePost } from "../../service/api";
const initialValues={
    title:'',
    description:'',
    pictures:'',
    username:'ankit',
    categories:'All',
    createDate:new Date()
}
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
    form:{
        display:'flex',
        flexDirection:'row',
        margin:'20px 20px 20px 20px'
    },
    textfield:{
        flex:1,
        margin:'0 10px',
        fontSize:20
    },
    textarea:{
        margin:'50px 20px 20px 20px',
        width:'100%',
        border:'none',
        '&:focus-visible':{
            outline:'none'
        }
    }
}));

const UpdateView=()=>{
    const classes=useStyles();

    const [post,setPost]=useState(initialValues);
    const param=useParams();
    const History=useHistory();
    useEffect(()=>{
        const fetchData=async()=>{
           let data=await getPost(param.id);
           //console.log(data)
           setPost(data);
        }
        fetchData();
    },[])
    const handleChange=(e)=>{
        setPost({
            ...post,
            [e.target.name]:e.target.value
        })
    }
    const updateBlog=async()=>{
        //console.log(post)
      await updatePost(param.id,post);
      History.push(`/details/${param.id}`)
    }
    const url='https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    return (
        <Box className={classes.conntainer}>
            <img src={url} alt='banner' className={classes.image}/>
            <FormControl className={classes.form}>
                <AddCircle fontSize="large" color='action'/>
                <InputBase placeholder="title" name="title" onChange={(e)=>handleChange(e)} value={post.title}className={classes.textfield}></InputBase>
                <Button onClick={()=>updateBlog()} variant="contained" color="primary">Update</Button>
            </FormControl>
            <TextareaAutosize
             minRows={5}
             placeholder=""
             value={post.description}
             className={classes.textarea}
             onChange={(e)=>handleChange(e)}
             name="description"
            />
        </Box>
    )
}
export default UpdateView;