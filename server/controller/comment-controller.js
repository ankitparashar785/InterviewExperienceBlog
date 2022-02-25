
import Comment from "../schema/comment-schema.js"
export const newComment=async(req,res)=>{
    try{
       const comment=new Comment(req.body);
       comment.save();
    }
    catch(error){
       res.status(500).json(error)
    }
}
export const getComments=async(req,res)=>{
    try{
      let comments= await Comment.find({postId:req.params.id});
     // console.log(comments)
      res.status(200).json(comments)
    }catch(error){
        res.status(500).json(error)
    }
}
export const deleteComment=async(req,res)=>{
    try{
      const comment= await Comment.findById(req.params.id);
     // console.log(comments)
      await comment.delete();
      res.status(200).send("Comment deleted")
    }catch(error){
        res.status(500).json(error)
    }
}