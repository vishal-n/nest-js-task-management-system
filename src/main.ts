import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Whenever NestJS ecounters validation decorators, it will automatically
  // execute the Validation pipe, to validate the fields with the decorator and 
  // saves us a lot of code at the controller level
  // create-task.dto.ts -> The file where the decorators are specified (here)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
