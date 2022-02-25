
import grid from 'gridfs-stream'
import mongoose from 'mongoose'
const url='http://localhost:8000'

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage=async(req,res)=>{
    try{
      if(!req.file)
       return res.status(404).send("File not found");
      const imageUrl=`${url}/file/${req.file.filename}`
     console.log(imageUrl)
      res.status(200).json(imageUrl)
    }catch(error){
        res.status(500).json(error);
    }
}
export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        console.log("Finded")
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json('Failed to fetch image', error);
    }
}