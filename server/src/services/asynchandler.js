const asyncHandler=(fn)=>(req,res,next)=>{
    try{
        fn(req,res,next)
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default asyncHandler