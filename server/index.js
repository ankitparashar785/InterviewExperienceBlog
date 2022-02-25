
import  express  from "express";
import  Connection from './database/db.js'
import Router from "./routes/route.js";
import bodyParser from 'body-parser';
import cors from 'cors'
const port=8000;
const app=express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router)
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})

Connection();