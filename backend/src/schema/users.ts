import { z } from 'zod';

export  const SignupSchema = z.object({
    name:z.string(),
    email: z.string().email(),
    password: z.string()
})


export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})


export const AddressSchema = z.object({
    state: z.string(),
    district: z.string(),
    municipality: z.string(),
    tole: z.string(),
    ward : z.number(),
    pincode: z.string().optional(),
    line : z.string().optional()
})

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().optional(),
    defaultBillingAddress: z.number().optional()
})