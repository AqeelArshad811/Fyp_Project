const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const prooductsRouter=require('./routers/productsRouter');
const userRouter=require('./routers/userRouter');
const app=express();

app.use(cors(
   {
    origin:process.env.CORS_ORIGIN,
    origin:["http://localhost:5173","http://localhost:5174","http://localhost:3000"],
    credentials:true
    
   } 
));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api',prooductsRouter);
app.use('/user',userRouter);
app.get('/',(req,res)=>{
    res.send('Hello from server');
})

module.exports={app};