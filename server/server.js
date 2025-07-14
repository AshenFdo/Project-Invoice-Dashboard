import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRouter from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


await connectDB();

app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/client',clientRoutes);



app.get('/',(req,res)=>{
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`.green.underline);

}); 

