import { Request, Response } from "express"
import { CreateCartSchema } from "../schema/cart"
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { Product } from "@prisma/client";
import { prisma } from "..";

export const addItemToCart = async (req:Request, res:Response)=> {
    const validateData = CreateCartSchema.parse(req.body);
    try {
        const product:Product = await prisma.product.findFirstOrThrow({
            where:{
                id:validateData.productId
            }
        }) 
    } catch (error) {
        throw new NotFoundException('Product Not Found', ErrorCodes.PRODUCT_NOT_FOUND);
    }

    const cart = await prisma.cartItem.create({
        data:{
            userId: req.user.id,
            productId:validateData.productId,
            quantity:validateData.quantity
        }
    });
    res.json(cart);

}

export const deleteItemFromCart = async (req:Request, res:Response)=> {
    await prisma.cartItem.delete({
        where:{
            id:+req.params.id
        }
    });
    res.json({success:true})
}

export const changeQuantity = async (req:Request, res:Response)=> {

}

export const getCart = async (req:Request, res:Response)=> {

}