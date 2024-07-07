import { NextFunction, Request } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization as string;
    if(!token){
        next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED_ACCESS));
    }
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prisma.user.findFirst({where:{id:payload.userId}})

}