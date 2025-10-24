import { Injectable } from '@nestjs/common';
import 'dotenv/config'
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
@Injectable()
export class AuthService {
    getAuthStatus():boolean{
        return true;
    }
    async registerUser(data:{username:string,email:string,password:string}){
        const hashedPassword = await bcryptjs.hash(data.password,10)
        const user = await prisma.user.create({
            data:{
                name:data.username,
                email:data.email,
                password:hashedPassword
            }
        });
        return user;
        
    }
    async loginUser(data:{email:string,password:string}){
        const user = await prisma.user.findUnique({
            where:{email:data.email}
        })
        if(!user){
            return {message:"User not found"}
        }
        const isPasswordValid = await bcryptjs.compare(data.password,user.password)
        if(!isPasswordValid){
            return {message:"Invalid password"}
        }
        const jwtKey = process.env.JWT_SECRET;
        if (!jwtKey) {
            throw new Error('JWT_KEY environment variable is not set');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, jwtKey, { expiresIn: '1h' });
        return { token,user };
    }

        
}
