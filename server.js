const mongoose=require('mongoose');
const dotenv=require('dotenv');


dotenv.config({path:'./config.env'});
const app=require('./app');

const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);


mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
}).then(()=>console.log('DB Conncetion successful'));

//start the server
const port=process.env.PORT || 3000;
const server=app.listen(port,()=>
{
    console.log(`app running on ${port}`);
})


process.on('unhandledRejection',err=>
{
    console.log('unhandled exception 🔥');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
})

