import https from 'http';
import {Server} from 'socket.io';
import { app } from './src/app.js';
import {PORT,MONGO_URI, WHITELIST_URLS} from "./src/config/config.js"
import { connectDB } from './src/database/db.js';
import * as socket from "./src/socket.js"

const server = https.createServer(app)
const socketServer = new Server(server,{
     cors: (origin, callback) => {
          if(!origin || WHITELIST_URLS.includes(origin) || WHITELIST_URLS.length === 0){
               callback(null,true)
          }else{
               callback(new Error("Not allowed by CORS"))
          } 
     },
     
},{credentials:true});
 

const startApplication = async() =>{
     await connectDB(MONGO_URI);
     server.listen(PORT,()=>{
          console.log("SERVER IS LISTENING ON PORT : " , PORT);
          console.log("LINK :" , "http://localhost:" + PORT+"/test");
     })
     socket.listen(socketServer);
}

startApplication();