
import mongoose from 'mongoose';

const Connection= async()=>{
    try{
     const url='mongodb+srv://Ankit:Ankit@123@cluster0.d9iea.mongodb.net/blogdata?retryWrites=true&w=majority';
     const URL="mongodb://localhost:27017/example"
     await mongoose.connect(URL,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true});
     console.log("Connected to cloud database wow")
    }catch(e){
        console.log("Error",e);
    }
}
export default Connection;