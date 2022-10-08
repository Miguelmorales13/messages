import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { validate } from "./configs/env.validations";
import { ConfigModule } from "@nestjs/config";
import { EmailService } from "./services/email/email.service";
import { TwilioService } from './services/twilio/twilio.service';

@Module({
  imports: [
    ConfigModule.forRoot({ validate })
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, TwilioService]
})
export class AppModule {
}
