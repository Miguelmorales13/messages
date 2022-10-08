import { Injectable } from "@nestjs/common";
import { TemplateEnum } from "./enums/template.enum";
import { EmailService } from "./services/email/email.service";
import { IEmailVerification } from "./models/email/IEmailVerification";
import { IEmailSubscription } from "./models/email/IEmailSubscription";
import { IEmailRecoveryPassword } from "./models/email/IEmailRecoveryPassword";
import { TwilioService } from "./services/twilio/twilio.service";

@Injectable()
export class AppService {

  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: TwilioService
  ) {
  }

  async sendEmail(email: string, template: TemplateEnum, data: Object): Promise<string> {
    switch (template) {
      case TemplateEnum.recoveryPassword:
        await this.emailService.sendRecoveryPassword(email, data as IEmailRecoveryPassword);
        break;
      case TemplateEnum.subscription:
        await this.emailService.sendSubscription(email, data as IEmailSubscription);
        break;
      case TemplateEnum.verification:
      default:
        await this.emailService.sendVerificationEmail(email, data as IEmailVerification);
        break;
    }
    return "Hello World!";
  }

  async sendSms(message: string, phoneNumber: string): Promise<string> {
    await this.smsService.sendSms(message, phoneNumber);
    return "Hello World!";
  }
}
