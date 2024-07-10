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

export const prisma = new PrismaClient().$extends({
    result:{
        address:{
            formattedAddress:{
                needs:{
                    district:true,
                    state:true,
                    municipality:true,
                    ward:true,
                    tole:true,
                    line:true
                },
                compute:(addr) =>{
                    return `${addr.state}, ${addr.district}, ${addr.municipality}- ${addr.ward}, ${addr.tole}, ${addr.line}`;
                }
            }
        }
    }
});



app.use(errorMiddleware);


// const PORT = "3000"

app.listen(PORT,()=>{
    console.log(`server is running at: http://localhost${PORT} `);
    
});