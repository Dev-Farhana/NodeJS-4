import express  from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import joi from 'joi';

const router = express.Router();

const users = [
    {
        id: 1,name: "Ab", email: "abcd@mail.com"
    },
    {
        id:2 ,name: "Oana", email: "Oan@mail.com"
    }
]

const schemaJoi = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.number().required().min(5),
    password: joi.string().required(),
})

router.get("/", (req,res) => {
    res.status(200).send({users: users})
})

router.post("/", async (req,res)=> {
    try {
        const value = await schemaJoi.validateAsync(req.body);
        const password = await bcrypt.hash(req.body.password , 6);
        const user =  new User({...req.body, password});
        const newUser = await user.save()
        const token = jwt.sign({_id: newUser._id, email: newUser.email}, "F4")
        return  res.status(200).send({status: 200 , message: "success!", users: newUser, token})    
    } catch (error) {
        return res.status(400).send({ status: 400   ,message: error})
    }
})
router.post("/login", async (req,res)=> {
    try {
        const user = await User.findOne({email: req.body.email}).then(res => res.toObject())
        if(!user){
           return req.status(401).send({status: 401 ,message: "User not Found"})
        }
        const compare = await bcrypt.compare(req.body.password, user.password);
        if(!compare){
            return req.status(403).send({status: 403 ,message: "Password not Matched"})
        }
        delete user.password
        const token = jwt.sign({_id: user._id, email: user.email}, "F4")
        return  res.status(200).send({status: 200 , message: "success!", user, token})    
    } catch (error) {
        return res.status(400).send({ status: 400   ,message: error})
    }
})


export default router;