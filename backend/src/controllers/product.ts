import { Request, Response } from "express";
import { prisma } from "..";
import { ProductSchema } from "../schema/product";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";



export const createProduct = async (req:Request,res:Response) =>{
    ProductSchema.parse(req.body);
    const product = await prisma.product.create({
        data:{
            ...req.body,
            tags: req.body.tags.join(',')
        }
    });
    res.json(product)
}

export const updateProduct = async (req:Request, res:Response) =>{
    try{

        const product = req.body;
        if(product.tags){
            product.tags = product.tags.join(',');
        }
        const updateProduct = await prisma.product.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:product
        });
        res.json(updateProduct);

    } catch(error){
        throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND);
    }
}

export const deleteProduct = async (req:Request, res:Response) =>{
    const id = req.params.id;
    try{
        await prisma.product.delete({
            where:{
                id:parseInt(id)
            }
        })
        res.json({
            message:"Deleted successfully"
        });
    } catch(error){
        throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND);
    }
    
}

export const listProduct = async (req:Request, res:Response) =>{
    const count = await prisma.product.count();
    const skip = req.query.skip || 0;
    const products = await prisma.product.findMany({
        skip: +skip,
        take:5
    });
    res.json({
        count,data:products
    })
}

export const getProductById = async (req:Request, res:Response) =>{
    try{
        const product = await prisma.product.findFirst({
            where:{
                id: +req.params.id
            }
        });
        res.json(product);

    } catch(error){
        throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND);
    }
}