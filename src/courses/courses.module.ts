import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
    controllers:[CoursesController],
    providers:[CoursesService]
})
export class CoursesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(CoursesController)

    }
}
