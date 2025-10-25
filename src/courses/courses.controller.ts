import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import type { Response } from 'express';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService:CoursesService){}

    @Get('all')
    getAllCourses(){
        return this.courseService.getCourses();
    }
    @Post('create')
    async createCourse(@Body() body:any , @Res({passthrough:true}) res:Response){
        const {course_code,course_name,course_description} = body;
        const course = await this.courseService.addCourse({course_code,course_name,course_description});
        res.status(201);
        return course;
    }
}
