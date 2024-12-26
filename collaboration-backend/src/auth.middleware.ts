import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./helper";

const auth = async(req:any,res:Response,next:NextFunction)=>{
    try{
        const token:string = req.headers["authorization"] || ""
        if(!token) res.status(404).send({
            message:"Unauthorized"
        })
        const data:any = verifyToken(token)
        req.assignId = data?.userId
        next()
    }
    catch(error){
        res.status(401).send({message: "Unauthorized"});
    }
}

export default auth;