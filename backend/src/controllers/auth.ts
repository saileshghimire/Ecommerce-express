import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets';

const prisma = new PrismaClient();

export const Signup = async (req:Request, res: Response) =>{
    const body = req.body;

    let user = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    })
    if(user) {
        throw Error('User already exist');
    }
    user = await prisma.user.create({
        data:{
            name: body.name,
            email: body.email,
            password: hashSync(body.password,10)
        }
    })
    return res.status(200).json(user);
}

export const Signin = async (req:Request, res:Response) =>{
    const body = req.body;
    let user = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    });
    if(!user){
        throw Error("User doesnot exist");
    }
    if(!compareSync(body.password,user.password)){
        throw Error("Incorrect password");
    }
    const token = jwt.sign({userId:user.id},JWT_SECRET);
    return res.status(200).json(token);

}