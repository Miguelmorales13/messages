import { Injectable } from "@nestjs/common";
import { TemplateEnum } from "./enums/template.enum";
import { EmailService } from "./services/email/email.service";
import { IEmailVerification } from "./models/email/IEmailVerification";
import { IEmailSubscription } from "./models/email/IEmailSubscription";
import { IEmailRecoveryPassword } from "./models/email/IEmailRecoveryPassword";

@Injectable()
export class AppService {

  constructor(private readonly service: EmailService) {
  }

  async sendEmail(email: string, template: TemplateEnum, data: Object): Promise<string> {
    switch (template) {
      case TemplateEnum.recoveryPassword:
        await this.service.sendRecoveryPassword(email, data as IEmailRecoveryPassword);
        break;
      case TemplateEnum.subscription:
        await this.service.sendSubscription(email, data as IEmailSubscription);
        break;
      case TemplateEnum.verification:
      default:
        await this.service.sendVerificationEmail(email, data as IEmailVerification);
        break;
    }
    return "Hello World!";
  }
}
