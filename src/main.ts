import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GetEnv } from "./configs/env.validations";
import { ValidationPipe } from "./pipes/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(GetEnv("PORT"));

}

bootstrap();
