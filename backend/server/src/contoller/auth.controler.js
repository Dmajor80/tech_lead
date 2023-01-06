const { json } = require("express");
const { getUser, getSellerById, update } = require("../services/user.services");
const { APIError } = require("../utils/apiError");
const responseBuilder = require('../utils/responseBuilder.utils')
const jwt = require("jsonwebtoken");
const { getRefreshTokenSecrete, getTokenSecrete } = require("../config/env");
exports.login=async(req,res,next)=>{
    try {

        const {username,password} =req.body;
        if(!username)
        next(APIError.badRequest('username  is required'));
        if(!password)
        next(APIError.badRequest('password is required'));
        const check =await getSellerById(username);
        if(!check)
        next(APIError.notFound("user does not exist"))
        const user =await getUser(username,password);
        if(!user || user.length ===0)
        next(APIError.notFound("Incorrect username or password"))
        if(user.error )
       return next(APIError.customError());
        const data= responseBuilder.buildUser(user[0]);
        const payload = { id: user[0].seller_id };
        const token = jwt.sign(payload,
            getTokenSecrete(),
            {
                expiresIn: "1h"
            });
        const refreshToken = jwt.sign(payload,
            getRefreshTokenSecrete(),
            {
                expiresIn: "2h"
            });
       
        const response = responseBuilder.commonResponse("Login successfull", data, "user", { token, refreshToken });
        res.cookie("jwt", token,  { 
            httpOnly:false,
            secure:true,
            sameSite:'none',
            maxAge: 60*60*1000,
         })
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

exports.updateAccount =async(req,res,next)=>{
    try {
        
        if(!req.seller_id)
        next(APIError.unauthenticated());
        const data={};
        if(!req.query.city && !req.query.state)
        next(APIError.badRequest());
        for(key in req.query){
            data[key]=req.query[key];
        }
        const user = await update(data,req.seller_id);
        if(user.ok!==1)
        return next(APIError.customError("Update failed, try again"))
        const seller= responseBuilder.buildUser(user.value);
        res.status(200).json({success:true,msg:"Update was successful",seller});
    } catch (error) {
        next(error);
    }
}