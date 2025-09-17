
const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt'); // for hash password 
const jwt = require('jsonwebtoken'); // For authentication
const SECRET_KEY = "***REMOVED***";  //JWT password
const {createVlog} = require('./mytype');
const {vlog , User } = require('./db');


//Signup page
app.post('/signup', async(req,res)=>{
    const {username,password} = req.body;

    const Userexists = await User.findOne({username});
    if (Userexists){
       return res.status(409).json({
            msg:"User already exists"
        })
    }
    //hash password 
    const hashedpassword = await bcrypt.hash(password,10);
   await User.create({
        username,
        password:hashedpassword
   })
   res.json ({
    msg:"User created successfully"
   })
});
// login page 

app.post('/login', async(req,res)=>{
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
    const token= jwt.sign({UserId: User._id},SECRET_KEY,{expiresIn:'1h'});

    res.json({ token });

})
// Middleware for authentication
 function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.Split('')[1];

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
// Create a vlog
 app.post('/vlogs', authMiddleware, async(req,res)=>{
    const createpayload = req.body;
    const parsepayload = createVlog.safeParse(createpayload);
    if (!parsepayload.success){
        res.status(411).json({
            msg:"Invalid Input"
        })
        return;
    }
    
    // database
    await vlog.create({
        title:createpayload.title,
        content:createpayload.content,
        authorname:createpayload.authorname,
        createdAt: new Date()

    })
    res.json({
        msg:"Vlog Created Successfully"
    })

 })

  app.get('/vlogs', async(req,res)=>{
    try{
    const vlogs = await vlog.find({});
    res.json(vlogs);}
    catch(err){
        res.status(500).json({
            msg:"Server Error"
        })
    }
  })

  app.get('/vlogs/author/:name',async(req,res)=>{
   
    try{
        const name = req.params.name;
        const singlevlog = await vlog.findOne({authorname:name});
        res.json(singlevlog);
    }
    catch(err){
        res.status(404).json({
            msg:" vlog with the name ${name} not found"
        })
    }
  })

  app.put('/vlogs/:id', async (res,req)=>{
    try{
        const id = req.params.id;
        const updatepayload = req.body;
        const parsepayload = createVlog.safeParse(updatepayload);
  }
  catch(err){
    res.status(404).json({
        msg:" vlog with the id ${id} not found"
    })
  }
  })

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

