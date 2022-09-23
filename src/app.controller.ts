import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { SendEmailRequestDto } from "./models/dto/send-email-request.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post("send-email")
  create(@Body() createEmailDto: SendEmailRequestDto) {
    return this.appService.sendEmail(createEmailDto.email, createEmailDto.template, createEmailDto.data);
  }
}
