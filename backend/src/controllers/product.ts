import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductSchema } from "../schema/product";

const prisma = new PrismaClient();

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