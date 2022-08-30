
const express=require('express');
const app=express();
const morgan=require('morgan');

const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');

//1) MIDDLEWARE:
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) =>{
    console.log('Hello from the middleware👋');
    next();
});
app.use((req,res,next) =>{
    req.requestTime=new Date().toISOString();
    next();
});

// app.get('/',(req,res) => {
//     res.status(200).json({message:'Hello from the server side !',app:'Natours'});

// });

// app.post('/',(req,res) => {
//     res.send('you can post to this endpoint...');
// });

// const tours=JSON.parse(
//     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
//     );
// 2) ROUTE HANDLERS:
// const getAllTours=(req,res) => {
//     console.log(req.requestTime);

//     res.status(200).json({
//         status:'Success',
//         requestedAt:req.requestTime,
//         results:tours.length,
//         data:{
//             tours
//         }
//     });
// }

// const getTour=(req,res) => {
//     console.log(req.params);

//     const id=req.params.id*1;
//     const tour=tours.find(el => el.id===id);

//     // if(id > tours.length) {
//         if(!tour) {
//         return res.status(404).json ({
//             status: "fail",
//             message: "Invalid ID"
//         });           
        
//     }
    
//     res.status(200).json({
//         status:'Success',  
//         data:{
//             tour
//         }
//     });
// }

// const createTour=(req,res) => {
//     // console.log(req.body);
//     // res.send('Done');

//     const newId = tours[tours.length-1].id+1;
//     const newTour = Object.assign({id:newId},req.body);
//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),
//     err=>{
//         res.status(201).json({
//             status:'Success',
//             data:{
//                 tour:newTour
//             }
//         });
//     });

// }

// const updateTour=(req,res) =>{
//     if(req.params.id*1 > tours.length) {
    
//         return res.status(404).json ({
//             status: "fail",
//             message: "Invalid ID"
//         });           
        
//     }

//     res.status(204).json({
//         status:"success",
//         data:{
//             tour:'<Updated tour here...>'
//         }
//     })
// }
// const deleteTour=(req,res) =>{
//     if(req.params.id*1 > tours.length) {
    
//         return res.status(404).json ({
//             status: "fail",
//             message: "Invalid ID"
//         });           
        
//     }

//     res.status(204).json({
//         status:"success",
//         data:null
//     })
// }

// const getAllUsers=(req,res) => {
//     res.status(500).json({
//         status:'error',
//         message:'This route is not yet defined'
//     });
// };
// const getUser=(req,res) => {
//     res.status(500).json({
//         status:'error',
//         message:'This route is not yet defined'
//     });
// };

// const createUser=(req,res) => {
//     res.status(500).json({
//         status:'error',
//         message:'This route is not yet defined'
//     });
// };

// const updateUser=(req,res) => {
//     res.status(500).json({
//         status:'error',
//         message:'This route is not yet defined'
//     });
// };

// const deleteUser=(req,res) => {
//     res.status(500).json({
//         status:'error',
//         message:'This route is not yet defined'
//     });
// };


// app.get('/api/v1/tours',getAllTours);
// app.post('/api/v1/tours/',createTour);
// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// 3) ROUTES

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports=app;


// // 4) START SERVER:

// const port=3000;
// app.listen(port, () =>{
//     console.log(`App running on the port ${port}...`);
// })