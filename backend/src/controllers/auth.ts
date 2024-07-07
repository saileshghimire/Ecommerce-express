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
import { NotFoundException } from '../exceptions/not-found';

const prisma = new PrismaClient();
// const prisma = prismaClient

export const Signup = async (req:Request, res: Response, next:NextFunction) =>{
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
}

export const Signin = async (req:Request, res:Response) =>{
    const body = req.body;
    let user = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    });
    if(!user){
        throw new NotFoundException('User doesnot exist',ErrorCodes.USER_NOT_FOUND);
    }
    if(!compareSync(body.password,user.password)){
        throw new BadRequestsException('Incorrect password', ErrorCodes.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({userId:user.id},JWT_SECRET);
    return res.status(200).json(token);

}

export const me = async (req:Request, res:Response) =>{

    res.json(req.user)
}