import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { SendEmailRequestDto } from "./models/dto/send-email-request.dto";
import { SendSmsRequestDto } from "./models/dto/send-sms-request.dto";
import { SendFireMessageDto } from "./models/firebase/send-fire-message.dto";
import { FirebaseMessagesService } from "./services/firebase-messages/firebase-messages.service";
import { SendMultiplesFireMessageDto } from "./models/firebase/send-multiples-fire-message.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseMessagesService: FirebaseMessagesService
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

  @Post("notification")
  sendNotification(@Body() sms: SendFireMessageDto) {
    return this.firebaseMessagesService.sendToDevice(sms);
  }

  @Post("notifications")
  sendNotifications(@Body() sms: SendMultiplesFireMessageDto) {
    return this.firebaseMessagesService.sendToMultipleDevices(sms);
  }
}
