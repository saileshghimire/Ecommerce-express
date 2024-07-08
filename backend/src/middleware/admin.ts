
import { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";


export const adminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const user = req.user;
    try {
        if(user.role == 'ADMIN'){
            next()
        }
        else{
            next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED_ACCESS))
        }
        
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED_ACCESS))
    }


}