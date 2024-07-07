import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets';
import { BadRequestsException } from '../exceptions/bad-request';
import { ErrorCodes } from '../exceptions/root';
// import { prismaClient } from '..';
import { UnprocessableEntity } from '../exceptions/validation';
import { SignupSchema } from '../schema/users';

const prisma = new PrismaClient();
// const prisma = prismaClient

export const Signup = async (req:Request, res: Response, next:NextFunction) =>{
    try{
        const body = req.body;
        SignupSchema.parse(body)
        let user = await prisma.user.findFirst({
            where:{
                email: body.email
            }
        })
        if(user) {
            next(new BadRequestsException('User already exist', ErrorCodes.USER_ALREADY_EXISTS));
        }
        user = await prisma.user.create({
            data:{
                name: body.name,
                email: body.email,
                password: hashSync(body.password,10)
            }
        })
        return res.status(200).json(user);

    } catch(error:any){
        console.log(error);
        
        next(new UnprocessableEntity(error?.issues, 'Unprocessable Entity', ErrorCodes.Unprocessable_ENTITY))
    }
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