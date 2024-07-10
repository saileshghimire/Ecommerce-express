import { Request, Response } from "express";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { Address } from "@prisma/client";
import { request } from "http";

export const createOrder = async(req:Request, res:Response) =>{
    return await prisma.$transaction(async(tx)=>{
        const cartItems = await tx.cartItem.findMany({
            where:{
                userId: req.user.id
            }, include:{
                product:true
            }
        })
        if(cartItems.length == 0){
            res.json({messgae:"cart is empty"})
        }
        const price = cartItems.reduce((pre,current)=>{
            return pre + (current.quantity * +current.product.price)
        },0);
        let address;
        if(req.user.defaultShippingAddress){
            address = await tx.address.findFirst({
                where:{
                    id:+req.user.defaultShippingAddress
                }
            });
        } else{
            throw new NotFoundException('Address not found', ErrorCodes.ADDRESS_NOT_FOUND)
        }
        if (!address) {
            throw new NotFoundException('Address not found', ErrorCodes.ADDRESS_NOT_FOUND)
        }
        const order = await tx.order.create({
            data:{
                userId:req.user.id,
                netAmount: price,
                address: address.formattedAddress,
                products: {
                    create: cartItems.map((cart) =>{
                            return{
                                productId:cart.productId,
                                quantity:cart.quantity
                            }
                    })
                }
            }
        })
        const orderEvent = await tx.orderEvent.create({
            data:{
                orderId:order.id,
                
            }
        })
        await tx.cartItem.deleteMany({
            where:{
                userId: req.user.id
            }
        })

        return res.json(order)
    })

}

export const listOrder = async(req:Request, res:Response) =>{
    const order = await prisma.order.findMany({
        where:{
            userId:req.user.id
        }
    })
    res.json(order);

}

export const cancelOrder = async(req:Request, res:Response) =>{
    try {
        const order = await prisma.order.update({
            where:{
                id:+req.params.id,
            },
            data:{
                status:"CANCELLED"
            }
        });
        await prisma.orderEvent.create({
            data:{
                orderId: order.id,
                status: "CANCELLED"
            }
        })
        res.json(order);
    } catch (error) {
       throw new NotFoundException('Order Not Found', ErrorCodes.ORDER_NOT_FOUND);
    }
}

export const getOrderById = async(req:Request, res:Response) =>{
    try {
        const order = await prisma.order.findFirstOrThrow({
            where:{
                id:+req.params.id,
            },
            include:{
                products :true,
                events :true
            }
        });
        res.json(order);
    } catch (error) {
       throw new NotFoundException('Order Not Found', ErrorCodes.ORDER_NOT_FOUND);
    }
}

export const listAllOrders = async (req:Request, res:Response) =>{
    const skip = req.query.skip || 0;
    let whereclause = {}
    const status = req.query.status
    if(status){
        whereclause={
            status
        }
    }

    const order = await prisma.order.findMany({
        where: whereclause,
        skip:+skip,
        take:5
    })

    res.json(order);
}

export const changeStatus = async (req:Request, res:Response) =>{
    try {
        const result = await prisma.$transaction(async (tx) => {
            const order = await tx.order.update({
                where: {
                    id: +req.params.id,
                },
                data: {
                    status: req.body.status,
                },
            });

            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: req.body.status,
                },
            });

            return order;
        });

        res.json(result);
    } catch (error) {
       throw new NotFoundException('Order Not Found', ErrorCodes.ORDER_NOT_FOUND);
    }
}

export const listUserOrders = async (req:Request, res:Response) =>{
    const skip = req.query.skip || 0;
    let whereclause:any = {
        userId: +req.params.id
    }
    const status = req.params.status
    if(status){
        whereclause={
            ...whereclause,
            status
        }
    }

    const order = await prisma.order.findMany({
        where: whereclause,
        skip:+skip,
        take:5
    })

    res.json(order);
}