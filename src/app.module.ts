import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesService } from './courses/courses.service';

@Module({
  imports: [AuthModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService, CoursesService],
})
export class AppModule {}
