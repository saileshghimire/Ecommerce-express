import express,{ Express, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';
import { errorMiddleware } from './middleware/errors';
import { PrismaClient } from '@prisma/client';
import { create } from 'domain';
import { SignupSchema } from './schema/users';


const app = express();

app.use(express.json());


app.use('/api',rootRouter);

export const prisma = new PrismaClient();

// export const prismaClient = new PrismaClient({
//     log:['query']
// }).$extends({
//     query:{
//         user:{
//             create({args,query}) {
//                 args.data = SignupSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// })

app.use(errorMiddleware);


// const PORT = "3000"

app.listen(PORT,()=>{
    console.log(`server is running at: http://localhost${PORT} `);
    
});