import { Injectable } from '@nestjs/common';
import 'dotenv/config'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
@Injectable()
export class CoursesService {
    getCourses():string[]{
        return ['Course 1','Course 2','Course 3'];
    }
    async addCourse(data:{course_name:string,course_code:string,course_description?:string}){
        const {course_name,course_code,course_description} = data;
        const course = await prisma.post.create({
            data:{
                course_name,
                course_code,
                course_description
            }
        })

        return course

    }

}
