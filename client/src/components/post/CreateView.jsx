
import {Button, Box,makeStyles,FormControl, InputBase ,TextareaAutosize,Select,MenuItem,InputLabel} from "@material-ui/core";
import { AddCircle, Category } from "@material-ui/icons";
import { ToastContainer ,toast} from "react-toastify";
import { useEffect, useState } from "react";
import { createPost ,uploadFile} from "../../service/api";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { categories } from "../../constants/Data";
import { async } from "@firebase/util";
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
    },
    formcontrol:{
      display:'flex',
      width:200,
      marginLeft:'30px'
    }
}));


const CreateView=()=>{

    const {currentUser}=useAuth();

   let userdetail=currentUser.email;
    const initialValues={
        title:'',
        description:'',
        picture:'',
        username:userdetail,
        categories:'',
        createDate:new Date(),
        likes:0
    }
    const classes=useStyles();
    const[post,setPost]=useState(initialValues)
    const[file,setFile]=useState('');
    const [image, setImage] = useState('');
    const[comapany,setCompany]=useState('')
    const History=useHistory();
   // console.log(post.pictures)
   const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    useEffect(()=>{
       const getImage=async()=>{
             if(file)
             {
                console.log("yes file")
                 const data=new FormData();
                 data.append("name",file.name);
                 data.append("file",file);
                 //console.log(data)
                 const imag = await uploadFile(data);
                  //console.log(imag.data)
                  post.picture = imag.data;
                  setImage(imag.data);
                 
                 
             }else{
                //console.log("NO file")
             }
       }
       getImage();
    },[file])
    const handleChange=(e)=>{
        setPost({
            ...post,
            [e.target.name]:e.target.value,
        })
    }
   // console.log(file)
    const savePost=async ()=>{
        if(post.categories !=='')
        {
            await createPost(post);
            History.push('/')
             
        }
       else{
        toast.error('Select company', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
       }
    }
 //  console.log(url)
    return (
        <Box className={classes.conntainer}>
            <img src={url} alt='banner' className={classes.image}/>
            <FormControl className={classes.form}>
                <label htmlFor="fileInput">
                <AddCircle fontSize="large" color='action'/>
                <input 
                 type='file'
                 id='fileInput'
                 style={{display:'none'}}
                 onChange={(e)=>setFile(e.target.files[0])}
                />
            
                </label>
                <InputBase name='title' onChange={(e)=>handleChange(e)} placeholder="title" className={classes.textfield}></InputBase>
                
                <Button onClick={()=>savePost()} variant="contained" color="primary">Publish</Button>
            </FormControl>
            
            <FormControl className={classes.formcontrol}>
                <InputLabel>Select Company</InputLabel>
                       <Select defaultValue="" name="categories" onChange={(e)=>handleChange(e)}>
                       
                           {
                               
                               categories.map((category,index)=>(
                                   <MenuItem value={category} key={Math.random()}>{category}</MenuItem>
                               ))
                           }
                       </Select>
            </FormControl>
            <TextareaAutosize
             minRows={5}
             placeholder="Tell your story..."
             className={classes.textarea}
             onChange={(e)=>handleChange(e)}
             name='description'
            />
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
        
        </Box>
    )
}
export default CreateView;