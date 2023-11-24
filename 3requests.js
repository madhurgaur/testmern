require('dotenv').config()
const express =require('express');
const server = express();
const mongoose = require('mongoose');
const cors =require('cors');
const path =require ('path');
const quoteRouter = require('./routes/quotes')
const userRouter = require('./routes/users')
console.log('env',process.env.DB_PASSWORD)

//db connection


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//schema

server.use(cors())
server.use(express.json()); //builtin middleware, body parser
// server.use(express.static(process.env.PUBLIC_DIR));
// server.use(express.static(__dirname + '/node_modules'));
console.log(__dirname)
server.use('/', async (req,res)=> {
  res.json("Yoooo!")
})
server.use('/api/quotes',quoteRouter.routes);
server.use('/api/users',userRouter.routes);
// server.use('*',(req,res)=>{
//    res.sendFile(path.resolve(__dirname,'build','index.html'))
// })


const auth = (req,res,next)=>{
    // console.log(req.query)
   if(req.body.password==='123'){
    // console.log(req.query.password)
    next()
   }else{
    res.sendStatus(404);
   }  
} 
// server.use(auth);


// C R U D

server.listen(process.env.PORT,(req,res)=>{
    console.log('server is running on ', process.env.PORT );
})


