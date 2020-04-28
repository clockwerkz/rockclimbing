const express = require('express');
let data = require('./data');
require('dotenv').config(); 
const User = require('./models/User');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4 } = require('uuid');
//Nodemon NPM website:
//https://www.npmjs.com/package/nodemon

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
 })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error("Error:",err));
app.use(bodyParser.json());
app.use(cors());



app.get('/test', (req,res)=> {
    res.status(200).send({msg: "Connected to the back end!"});
});

async function authenticate(req, res, next) {
    console.log("Authenticate");
    let token = req.header("rc-auth-token");
    if (token) {
        let user = await User.findOne({ token });
        if (user) {
            req.user = user;
        }
    } 
    next();
}

app.use(authenticate);

//Protect API route

app.get('/profile', authenticate, function(req,res){
    if (req.user) {
        console.log(req.user);
        return res.status(200).send(req.user);
    }
    return res.status(400).send({ err : "User Profile Not Found" });
});

app.post('/profile', function(req,res){
    const profile = req.body;
    if (profile.email !== undefined) {
       //Save new person in database 
        const newUser = new User(profile);
        newUser.save()
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send({ err }));
    } else {
        return res.status(400).send("Invalid person");
    }
});

app.post('/login', async function(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user && user.password === password ) {
            let token = v4();
            user.token = token;
            await user.save();
            res.status(200).send({token}); 
        } else {
            return res.status(400).send({ err : "incorrect info"});
        }   
    } catch (err) {
        res.status(400).send({err})
    }
});

app.get('/logout', authenticate, async function(req, res) {
    if (req.user) {
        let id = req.user.id;
        let savedUser = await  User.findByIdAndUpdate(id, {$set: { "token":"" }}, {new: true});
        return res.status(200).send(savedUser);
    } else {
        return res.status(400).send(err);
    }
});


app.put('/profile', authenticate, async function(req,res){
    try {
        if (req.user) {
            let id = req.user.id;
            let profile = req.body;
            let savedUser = await  User.findByIdAndUpdate(id, {$set: { ...profile }}, {new: true});
            return res.status(200).send(savedUser);
        }
        return res.status(400).send({ err : "Error Updating User"});
    } catch (err) {
        return res.status(400).send(err);
    }
});

app.delete('/profile', authenticate, async function(req,res){
    try {
        if (req.user) {
            const id = req.user.id;
            let user = await User.findByIdAndDelete(id);
            if (user!==null) {
                return res.status(200).send({msg : `User id ${id} was successfully deleted.`});
            } else {
                return res.status(400).send({ err: "User Not Found" });
            }
        } else {
            return res.status(400).send({ err : "Error Deleting User"});
        }
    } catch(err) {
        return res.status(400).send({ err });
    }
});


app.listen(PORT, function(){
    console.log(`Server is listening on ${PORT}`);
});