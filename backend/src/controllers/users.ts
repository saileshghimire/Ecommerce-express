import { Request, Response } from "express";
import { prisma } from "..";
import { Address, User } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { json } from "stream/consumers";
import { visitParameterList } from "typescript";
import { BadRequestsException } from "../exceptions/bad-request";


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
try{
    const id = req.params.id;
    await prisma.address.delete({
        where:{
            id: +id
        }
    });
    res.json({success:true})
} catch(error){
    throw new NotFoundException('Address Not Found', ErrorCodes.ADDRESS_NOT_FOUND);
}

}

export const listAddress = async (req:Request, res:Response) =>{
    const address = await prisma.address.findMany({
        where:{
            userId:req.user.id
        }
    });

    res.json(address);
}

export const updateUser = async (req:Request, res:Response) =>{
    const validateData = UpdateUserSchema.parse(req.body);
    let shippingAddress:Address;
    let billingAddress: Address;
    if(validateData.defaultShippingAddress){
        try {
            shippingAddress = await prisma.address.findFirstOrThrow({
                where:{
                    id: validateData.defaultShippingAddress
                }
            })
            
        } catch (error) {
            throw new NotFoundException('Address Not Found', ErrorCodes.ADDRESS_NOT_FOUND);
    
        }
        if(shippingAddress.userId != req.user.id){
            throw new BadRequestsException('Address doesnot belong to user',ErrorCodes.ADDRESS_DOES_NOT_BELONG);
        }
    }

    if(validateData.defaultBillingAddress){
        try {
            billingAddress = await prisma.address.findFirstOrThrow({
                where:{
                    id: validateData.defaultBillingAddress
                }
            })
        } catch (error) {
            throw new NotFoundException('Address Not Found', ErrorCodes.ADDRESS_NOT_FOUND);
            
        }
        if(billingAddress.userId != req.user.id){
            throw new BadRequestsException('Address doesnot belong to user',ErrorCodes.ADDRESS_DOES_NOT_BELONG);
        }
    }
    const updateUser = await prisma.user.update({
        where:{
            id:req.user.id
        },
        data:validateData
    })
    res.json(updateUser);
};