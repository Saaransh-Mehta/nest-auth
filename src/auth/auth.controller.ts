import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get('status')
    getStatus():boolean{
        return this.authService.getAuthStatus();
    }
    @Post('register')
    async register(@Body() body:any){
        const {username,email,password} = body;
        return this.authService.registerUser({username,email,password})
        
    }
    @Post('login')
    async loginUser(@Body() body:any, @Res({passthrough: true}) res:Response){
        const {email,password} = body
        const token = await this.authService.loginUser({email,password})
        res.cookie('auth_token',token,{httpOnly:true,secure:false})
        return {message:"Login successful" , user:token};
    }

    @Post('logout')
    async logoutUser(@Res({passthrough:true}) res:Response ){
        res.clearCookie('auth_token')
        return {message:"Logout successful"};
    }
}
