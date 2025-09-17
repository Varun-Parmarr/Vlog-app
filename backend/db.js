
const moongoose = require('mongoose');
 
moongoose.connect('mongodb+srv://Admin:1ffePwbIjn8z99kp@cluster0.blucicy.mongodb.net/vloggs')

const vlogSchema = new moongoose.Schema({
    title: String,
    content: String,
    authorname: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const vlog = moongoose.model('vlog', vlogSchema);

const userschema = new moongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = moongoose.model('User', userschema);

module.exports = {vlog , User};