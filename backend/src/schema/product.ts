import zod from 'zod';

export const ProductSchema = zod.object({
    name:zod.string(),
    description: zod.string(),
    price: zod.number(),
    tags:zod.array(zod.string())
})