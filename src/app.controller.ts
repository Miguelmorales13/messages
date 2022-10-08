import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { SendEmailRequestDto } from "./models/dto/send-email-request.dto";
import { SendSmsRequestDto } from "./models/dto/send-sms-request.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {
  }

  @Post("send-email")
  sendEmail(@Body() createEmailDto: SendEmailRequestDto) {
    return this.appService.sendEmail(createEmailDto.email, createEmailDto.template, createEmailDto.data);
  }

  @Post("send-sms")
  sendSms(@Body() sms: SendSmsRequestDto) {
    return this.appService.sendSms(sms.message, sms.phoneNumber);
  }
}
