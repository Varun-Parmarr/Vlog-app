
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

const vlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    authorname: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const vlog = mongoose.model('vlog', vlogSchema);

const userschema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userschema);

module.exports = {connectDB ,vlog , User};