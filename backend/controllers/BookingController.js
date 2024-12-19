const express = require('express');
const app = express.Router();
const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.post ('/create', async(req, res, next)=>{
    try {
        const result = await prisma.booking.create({
            data: req.body
        });
        res.send({message : 'success'});
    } catch (e) {
        res.status(500).send({error : e.message})
    }
})

app.get ('/list', async(req, res)=>{
    try {
        const data = await prisma.booking.findMany();
        res.send({results : data});
    } catch (e) {
        res.status(500).send({error : e.message})
    }
})

app.delete ('/remove/:id' ,async(req, res) => {
    try {
        await prisma.booking.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send({ message : 'success'})
    } catch(e) {
        res.status(500).send({error : e.message})
    }
})

module.exports = app;