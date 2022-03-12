
import axios from 'axios';

const url='http://localhost:8000'

export const createPost=async (post)=>{

    try{
        return await axios.post(`${url}/create`,post);
    }catch(error){
       console.log('Error while post',error)
    }
}
export const getAllPosts=async (param)=>{
    try{
      let response=  await axios.get(`${url}/posts${param}`);
      return response.data;
    }catch(error){
        console.log("Error while calling getAll post",error)
    }
}
export const getPost=async(id)=>{
    try{
       let response=await axios.get(`${url}/post/${id}`);
       return response.data;
    }catch(error){
       console.log('Error while calling getpost api',error)
    }
}
export const updatePost=async(id,post)=>{
    try{
      //  console.log(`${url}/update/${id}`);
       await axios.post(`${url}/update/${id}`,post)
    }catch(error){
        console.log("Error calling update",error.message)
    }
}
export const deletePost=async(id)=>{
    try{
        //console.log(id)
     return await axios.delete(`${url}/delete/${id}`)
    }catch(error){
      console.log('Error while calling delete api',error);
    }
}
export const uploadFile=async(data)=>{
  try{
    //  console.log(data)
      return await axios.post(`${url}/file/upload`,data)
  }catch(error){
      console.log("Error while upload image",error);
  }
}


export const newComment = async (comment) => {
    try {
        return await axios.post(`${url}/comment/new/`, comment);
    } catch(error) {
        console.log('Error while calling newComment API ', error)
    } 
}
export const getComments = async (id) => {
    try {
        let response=await axios.get(`${url}/comments/${id}`);
        return response.data;
    } catch(error) {
        console.log('Error while calling getComment API ', error)
    } 
}
export const deleteComment=async(id)=>{
    try{
       return await axios.delete(`${url}/comment/delete/${id}`)
    }catch(error){
        console.log('Error while calling deleteComment API ', error)
    }
}
export const updateLikes=async(id,post)=>{
    try{
        //console.log("Likes ",like)
         return await axios.post(`${url}/update/${id}`,post)

    }catch(error){
        console.log('Error while calling update likes')
    }
}