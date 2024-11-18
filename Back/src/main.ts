import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200',  // Permitir solicitudes solo desde este origen
    methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
  });

  await app.listen(3001);
}
bootstrap();