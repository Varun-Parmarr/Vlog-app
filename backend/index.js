require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt'); // for hash password 
const jwt = require('jsonwebtoken'); // For authentication
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.JWT_KEY; // JWT secret key
const {createVlog} = require('./mytype');
const {connectDB, Media , User, Review } = require('./db');
const cors = require('cors');

connectDB();

app.use(cors({
    origin:['http://localhost:5173',
    "https://binge-judge.vercel.app"],
}))

//Signup page
app.post('/signup', async(req,res)=>{
    const {username,password} = req.body;

// validation 
    if(!username|| !password || username.trim()===''|| password.trim()===''){
       return res.status(403).json({
        msg:"Username or Password is empty"
       })
    }

    const Userexists = await User.findOne({username});
    if (Userexists){
       return res.status(409).json({
            msg:"User already exists"
        })
    }
    //hash password 
    const hashedpassword = await bcrypt.hash(password,10);
    const newUser =await User.create({
        username,
        password:hashedpassword
   })

   const token= jwt.sign({UserId: newUser._id},SECRET_KEY,{expiresIn:'1h'});

   res.json ({
    msg:"User created successfully"
   })
});

// login page 
app.post('/login', async(req,res)=>{
    try {
    const {username,password} = req.body;

    const Founduser= await User.findOne({username});

    if(!Founduser){
       return res.status(401).json({
        msg:"Invalid username name is entered"
       })
    }

    const isMatch= await bcrypt.compare(password,Founduser.password);
    
     if(!isMatch){
       return res.status(401).json({
        msg:"Invalid username name is entered"
       })
    }

   // generate JWT token
    const token= jwt.sign({UserId: Founduser._id},SECRET_KEY,{expiresIn:'1h'});

    res.json({ token });


} catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
        msg:"Server Error",
        error: error.message
       })
}
    
})
// Middleware for authentication
 function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

if(!token){
    return res.status(401).json({
        msg:"No token provided"
    })
}

jwt.verify(token , SECRET_KEY,(err,user)=>{
    if(err){
        return res.status(403).json({
            msg:"Invalid token"
        })
    }

    req.user = user;
    next();
})
}

// Create a Media
 

  app.get('/api/media', async(req,res)=>{
    try{
    const allMedia = await Media.find({})
    .populate('addedBy','username');

    res.status(200).json(allMedia);
  }
    catch(err){
        console.error("Error in getAllMediaItems:", error);
        res.status(500).json({
            msg:"Server Error"
        })
    }
  })

  app.post('/api/media', authMiddleware, async(req,res)=>{
    console.log('Received body:', req.body);
    try{
    const createpayload = req.body;
    const parsepayload = createVlog.safeParse(createpayload);
    if (!parsepayload.success){
        res.status(411).json({
            msg:"Invalid Input",
            errors: parsepayload.error.flatten().fieldErrors
        })
        return;
    }
    
    const UserID= req.user.UserId;

    // database
    await Media.create({
        title:createpayload.title,
        content:createpayload.content,
        imageURL:createpayload.imageURL,
        type:createpayload.type,
        addedBy: UserID,

    })
    res.json({
        msg:"Media Created Successfully"
    })
}
    catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }

 })

  //search media by title
  app.get('/api/media/search', async(req,res)=>{
 
    try{
       const title= req.query.title;

       const mediaItems = await Media.find({
        title: { $regex: title, $options: 'i' }
       }).select('title _id')

       if(mediaItems.length===0){
        return res.status(404).json({
            msg:"No item found"
        })
       }

         res.status(200).json(mediaItems);

    }
    catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }

})

  // Review section

  app.post('/review/:mediaId',authMiddleware,async(req,res)=>{

    const {rating,comment}= req.body;
  //validation
    if(!rating || rating <1 || rating >5|| comment.trim()===''){
        return res.status(400).json({
            msg:"Invalid rating value"
        })
    }
    
    try{
    const mediaId = req.params.mediaId;
    const userId = req.user.UserId;

    // check if media exists
    const MediaExists = await Media.findById(mediaId);
    if(!MediaExists){
        return res.status(404).json({
            msg:"Media not found"
        })
    }
    await Review.create({
        rating,
        comment:comment.trim(),
        user: userId,
        media: mediaId
    });

    res.status(201).json({
        msg:"Review added successfully"
    })
}
    catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

// Get reviews for a media item
app.get('/review/:mediaId', async(req,res)=>{
    try{
    const mediaId = req.params.mediaId;

    const reviews = await Review.find({media:mediaId})
    .populate('user','username')
    .select( 'rating comment user')
    .sort({createdAt:-1})

    res.status(200).json(reviews);

 }

  catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

