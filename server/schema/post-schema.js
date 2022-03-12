import  mongoose from "mongoose";


const postsSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,

    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:false
    },
    createDate:{
        type:Date
    },
    likes:{
        type:Number,
        default:0
    }
})
const post=mongoose.model('Post',postsSchema);
export default post;