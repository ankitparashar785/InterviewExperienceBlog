
import { GridFsStorage } from 'multer-gridfs-storage'
import multer from 'multer'

/*var storage =multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'uploads');
    },
    filename:function(req,filw,callback){
        var txt=file.originalname.substr(file.originalname.lastIndexOf());
        callback(null,file.filename+'-'+Date.now()+ext);
    }
}) */
  
 const storage= new GridFsStorage({
    url :'mongodb+srv://Ankit:Ankit@123@cluster0.d9iea.mongodb.net/blogdata?retryWrites=true&w=majority',
    options:{
        useNewUrlParser:true,useUnifiedTopology:true
    },
    file:(req,file)=>{
      const match=  ["image/png","image/jpg"];
      if(match.indexOf(file.memeType)===-1)
      return  `${Date.now()}-blog-${file.originalname}`
      
      return {
          bucketName:"photos",
          fileName:`${Date.now()}-blog-${file.originalname}`
      }
    }
})
export default multer({storage})
