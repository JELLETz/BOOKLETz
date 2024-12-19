const express = require('express');
const app = express.Router();
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function checkSignIn(req, res, next){
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret);

        if (result != undefined) {
            next();
        }

    } catch (e) {
        res.status(500).send({error : e.message})
    }
}

function getUserId(req, res) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret);

        if (result != undefined) {
            return result.id;
        }
    } catch (e) {
        res.status(500).send({error : e.message})
    }
}

app.post('/signIn', async (req,res) =>{
    try{
        if (req.body.username === undefined || req.body.password === undefined) {
            return res.status(401).send({message : 'unauthorized'})
        }
        const user = await prisma.user.findFirst({
            select:{
                id: true,
                username: true
            },
            where:{
                username: req.body.username,
                password: req.body.password
            }
        })

        if (user != null) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, {expiresIn: '30d'});
            return res.send({ token: token })
        }

        res.status(401).send({message : 'unauthorized'}) 
    } catch (e) {
        res.status(500).send({error : e.message})
    }
})

app.get('/info', checkSignIn, async (req,res,next) => {
    try {
        const userId = getUserId(req, res);
        const user = await prisma.user.findFirst({
            select: {
                username: true,
                role: true
            },
            where: {
                id: userId
            }
        })
        res.send({ result : user});
    } catch (e) {
        res.status(500).send({error : e.message});
    }
})

app.post('/create', async(req,res)=>{
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                role: 'user'
            }
        })
        res.send({message : 'success'});
    } catch(e) {
        res.status(500).send({error : e.message});
    }
})

module.exports = app;