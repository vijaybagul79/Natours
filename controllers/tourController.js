const fs=require('fs');

const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
    );

exports.checkID=(req,res,next,val) =>{
    console.log(`Tour id is:${val}`);

    if(req.params.id*1 > tours.length) {    
        return res.status(404).json ({
            status: "fail",
            message: "Invalid ID"
        });                   
    }
    next();
}

exports.checkBody=(req,res,next) =>{
    if (!req.body.name || req.body.price) {
        return res.status(400).json({
            status:'fail',
            message:'Missing name or price'
        })
    }
    next();
}

exports.getAllTours=(req,res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status:'Success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    });
};

exports.getTour=(req,res) => {
    console.log(req.params);

    exports. id=req.params.id*1;
    exports. tour=tours.find(el => el.id===id);

    // // if(id > tours.length) {
    //     if(!tour) {
    //     return res.status(404).json ({
    //         status: "fail",
    //         message: "Invalid ID"
    //     });           
        
    // }
    
    res.status(200).json({
        status:'Success',  
        data:{
            tour
        }
    });
}

exports.createTour=(req,res) => {
    // console.log(req.body);
    // res.send('Done');

    exports.newId = tours[tours.length-1].id+1;
    exports.newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),
    err=>{
        res.status(201).json({
            status:'Success',
            data:{
                tour:newTour
            }
        });
    });

}

exports.updateTour=(req,res) =>{
    // if(req.params.id*1 > tours.length) {
    
    //     return res.status(404).json ({
    //         status: "fail",
    //         message: "Invalid ID"
    //     });           
        
    // }

    res.status(204).json({
        status:"success",
        data:{
            tour:'<Updated tour here...>'
        }
    })
}
exports.deleteTour=(req,res) =>{
    res.status(204).json({
        status:"success",
        data:null
    });
}