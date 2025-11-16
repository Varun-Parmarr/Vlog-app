
const mongoose = require('mongoose');
 
const MongoURL = process.env.MONGO_URI;

const connectDB = async ()=>{

    try {
        await mongoose.connect(MongoURL);
        console.log("MongoDB connected successfully");
    }
    catch (err){
        console.log("MongoDB connection failed", err);
    }
}

const MediaSchema = new mongoose.Schema({
    title:{
    type: String,
    required: true,
    trim:true
},
    content:{
    type:String,
    required:true,
    trim:true
},
    imageURL:{
    type:String,
    required:true,
    trim:true
},
    type:{
    type:String,
    enum:['movie','series','anime'],
    required:true
},
    addedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
}, {
  timestamps: true
    
});

const Media = mongoose.model('Media', MediaSchema);

const userschema = new mongoose.Schema({
    username:{
    type : String,
    require: true,
    unique: true
    },
    password:{
        type: String,
        require: true,
    },
        createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userschema);

const ReviewSchema = new mongoose.Schema({
     rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment:{
        type: String,
        required: true,
        trim:true
    },
    user:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true   
    },
    media:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Media',
        required:true
    }
},{
    timestamps:true

})

const Review = mongoose.model('Review', ReviewSchema);


module.exports = {connectDB ,Media, User, Review};