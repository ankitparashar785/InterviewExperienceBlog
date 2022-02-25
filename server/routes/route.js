
import  express  from "express";
import { createPost,getAllPost ,getPost,updatePost,deletePost,updateLikes} from "../controller/post-controller.js";
import {uploadImage,getImage} from '../controller/image-controller.js'
import { newComment ,getComments,deleteComment} from "../controller/comment-controller.js";
import upload from '../utils/upload.js'

const router=express.Router();

router.post('/create',createPost);
router.get('/posts',getAllPost);
router.get('/post/:id',getPost)
router.post('/update/:id',updatePost)
router.delete('/delete/:id',deletePost)
router.post('/file/upload',upload.single('file'),uploadImage)
router.get('/file/:filename',getImage);
router.post('/comment/new',newComment);
router.get('/comments/:id',getComments)
router.delete('/comment/delete/:id',deleteComment)
//router.post('/likes/:id',updateLikes)
export default router