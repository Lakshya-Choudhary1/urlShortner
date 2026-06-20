import express from 'express';
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from 'path';
import session from "express-session"
import passport from 'passport';
import { fileURLToPath } from 'url';
import {WHITELIST_URLS,MODE,SESSION_SECRET_KEY} from "./config/config.js"
import mainRoute from './routes/main.route.js'; 
import UrlModel from './models/url.model.js';
import  "./config/passport.js"

//dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:", "https://lh3.googleusercontent.com",
  "https://*.googleusercontent.com"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5173", "ws://localhost:5173"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
    },
  })
);

app.use(cors({
     origin:(origin,callback)=>{
          if(!origin || WHITELIST_URLS.includes(origin) || WHITELIST_URLS.length === 0){
               callback(null,true)
          }else{
               callback(new Error("Not allowed by CORS"))
          }
     },
     credentials:true
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret:SESSION_SECRET_KEY,
  resave:false,
  saveUninitialized:false,
  proxy:true,
  cookie:{
    maxAge: 1000*60*60*24*7,
    httpOnly:true,
    secure: MODE === "production",
    sameSite:"lax"
  }
}))

app.use(passport.initialize());
app.use(passport.session())

//Routes
app.use("/api/v1",mainRoute);


//google oauth 
app.get(
     "/oauth/google",
     passport.authenticate("google", { scope: ["profile", "email"] })
);
//google oauth redirect
const url = MODE === 'production' ? "https://urlshortner-tav4.onrender.com/dashboard" : "http://localhost:5173/dashboard"
app.get('/oauth/google/redirect',
     passport.authenticate("google",{
          session:true,
          successRedirect: url,
          failureRedirect: "/"
     }
));

//test api
app.get("/test",(req,res)=>{ 
     res.json({message:"Hello World"});
});


//hanlde redirect to original url from short url
app.get("/:shortUrl", async (req, res,next) => {
  try {
    const { shortUrl } = req.params;

    const urlData = await UrlModel.findOneAndUpdate(
      {
        shortUrl,
        isActive: true,
        $or: [
          { expiresAt: null },
          { expiresAt: { $gt: new Date() } }
        ]
      },
      { $inc: { clicks: 1 } },
      { returnDocument: 'after' }
    );

    if (!urlData) {
      return next()
    }


    return res.redirect(urlData.originalUrl);

  } catch (error) {
    console.error("Error handling short URL request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// production frontend
if (MODE === "production") {
  const publicPath = path.join(__dirname, "..", "public");

  app.use(express.static(publicPath));

  app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
}

export {app};