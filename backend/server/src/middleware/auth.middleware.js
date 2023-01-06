const { getSellerById } = require("../services/user.services");
const { APIError } = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const { getTokenSecrete } = require("../config/env");

exports.userRequired =async(req,res,next)=>{
    try {
        const token =req.cookies.jwt; 
       
        if(!token)
        return next(APIError.unauthenticated());
        const payload= jwt.verify(req.cookies.jwt,getTokenSecrete());
        const isUser = await getSellerById(payload.id);
        if(!isUser || isUser.length===0)
        next(APIError.notFound("User does not exist"));
        if(isUser.error) 
        return next(APIError.customError(`user does not exist`,404));
        req.seller_id=payload.id; 
        next();
    } catch (error) {
        next(error)
    }
}