const express=require('express');
const app=express();
const Apperror=require('./src/backend/controllers/apperror');
const invoicerouter=require('./src/backend/routes/invoiceRouter');
const issuerouter=require('./src/backend/routes/isssueRouter');
const projectrouter=require('./src/backend/routes/projectRouter');
const userrouter=require('./src/backend/routes/userRouter');
const morgan=require('morgan');
app.use(express.json());

if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));

}

// //security http headers
// app.use(helmet());

app.use((req,res,next)=>
{
    console.log('hello from the middleware 👍');
    next();
})

app.use((req,res,next)=>
{
    req.requestTime=new Date().toUTCString();
    console.log(req.cookies);
    next();
})







app.use('/api/v1/projects',projectrouter);
app.use('/api/v1/users',userrouter);
app.use('/api/v1/invoices',invoicerouter);
app.use('/api/v1/issues',issuerouter);

app.all('*',(req,res,next)=>
{
    res.status(404).json({
        status:fail,
        message:`cant find ${req.originalUrl} on the server`
    });
    next();

    next(new Apperror(`cant find ${req.originalUrl} on the server`,404));

})



module.exports=app;