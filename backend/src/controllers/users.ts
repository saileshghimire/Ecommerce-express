import { Request, Response } from "express";
import { prisma } from "..";
import { User } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { AddressSchema } from "../schema/users";
import { json } from "stream/consumers";


export const addAddress = async(req:Request, res:Response) =>{
    AddressSchema.parse(req.body)
    const address = await prisma.address.create({
        data:{
            ...req.body,
            userId:req.user.id
        }
    })

    return res.json(address)

}

export const deleteAddress = async (req:Request, res:Response) =>{

}

export const listAddress = async (req:Request, res:Response) =>{

}