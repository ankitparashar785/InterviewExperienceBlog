
import Post from './Post'
import { Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../../service/api';
import { makeStyles } from '@material-ui/core';

const useStyles=makeStyles({
   container:{
      width:'300px',
      background:'red'
   }
})
const Posts=()=>{
 //   let posts=[1,2,3,4,5,6,7,8,9];
   const classes=useStyles();
    const [posts,setPosts]=useState([]);
    const {search}=useLocation();
    useEffect(()=>{
       const fetchData =async()=>{
          let data=await getAllPosts(search);
         // console.log(data)
          setPosts(data)
       
       }
       fetchData();
      // console.log(posts);
    },[search])
    return (
       
        <>
          {
            posts.map((post,index)=>(
                <Grid item lg={3} sm={4} xs={12} >
                   <Link to={`/details/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                      <Post key={Math.random()} post={post}/>
                   </Link>
                </Grid>
            ))
           }
        </>
    )
}
export default Posts;