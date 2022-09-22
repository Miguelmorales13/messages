import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SendEmailRequestDto } from "./models/dto/send-email-request.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern("sendEmail")
  create(@Payload() createEmailDto: SendEmailRequestDto) {
    return this.appService.sendEmail(createEmailDto.email, createEmailDto.template, createEmailDto.data);
  }
}
