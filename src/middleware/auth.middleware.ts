import { Injectable , NestMiddleware} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req:Request, res:Response, next:NextFunction){

        const token = req.cookies['auth_token']

        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
         try{
      const jwtKey = process.env.JWT_SECRET
      if(!jwtKey){
        return res.status(500).json({message:"Server configuration error: JWT secret not set"})
      }
      const decoded = jwt.verify(token, jwtKey)
            req.user = decoded;
            next()
         }catch(err){
            return res.status(401).json({message:"Invalid Token"})
         }
    }
}