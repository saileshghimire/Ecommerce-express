import express,{ Express, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';


const app = express();

app.use(express.json());

app.use('/api',rootRouter);



// const PORT = "3000"

app.listen(PORT,()=>{
    console.log(`server is running at: http://localhost${PORT} `);
    
});