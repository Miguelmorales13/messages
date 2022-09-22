import { Injectable } from "@nestjs/common";
import { TemplateEnum } from "./enums/template.enum";
import { EmailService } from "./services/email/email.service";
import { IEmailVerification } from "./models/email/IEmailVerification";

@Injectable()
export class AppService {

  constructor(private readonly service: EmailService) {
  }

  async sendEmail(email: string, template: TemplateEnum, data: Object): Promise<string> {
    await this.service.sendVerificationEmail(email, data as IEmailVerification);
    return "Hello World!";
  }
}
