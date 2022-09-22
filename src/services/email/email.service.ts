import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createTestAccount, createTransport, Transporter } from "nodemailer";
import { join } from "path";
import { renderFile } from "pug";
import { IEmailSubscription, IEmailSubscriptionClient } from "../../models/email/IEmailSubscription";
import { IEmailVerification } from "../../models/email/IEmailVerification";
import { IEmailRecoveryPassword } from "../../models/email/IEmailRecoveryPassword";
import { GetEnv } from "../../configs/env.validations";

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    let user: any =
      GetEnv("EMAIL_TEST") == "true"
        ? createTestAccount()
        : { user: GetEnv("EMAIL_USER"), pass: GetEnv("EMAIL_PASSWORD") };
    const transporterData = {
      port: parseInt(GetEnv("EMAIL_PORT")),
      host: GetEnv("EMAIL_HOST"),
      secure: GetEnv("EMAIL_SECURE") == "true",
      logger: true,
      auth: { ...user }
    };
    console.log(transporterData);
    this.transporter = createTransport(transporterData);
    this.transporter.verify().then(console.log);
  }

  private async sendMail(to: string, subject: string, html: string): Promise<Transporter> {
    return await this.transporter.sendMail({ from: GetEnv("EMAIL_USER"), to, subject, text: "text", html });
  }

  private async generateTemplate<T>(
    template: string,
    object: T
  ): Promise<string> {
    if (GetEnv("NODE_ENV") == "development") {
      return renderFile(
        join(__dirname, `../../../src/services/email/templates/${template}.email.pug`),
        { ...object }
      );
    } else {
      return renderFile(join(__dirname, `/templates/${template}.email.pug`), {
        ...object
      });
    }
  }

  async sendSubscription(to: string, object: IEmailSubscription) {
    try {
      const template = await this.generateTemplate<IEmailSubscription>(
        "subscription",
        object
      );
      await this.sendMail(
        to,
        "Registro exitoso en la plataofrma 'GE-Evaluaciones' ",
        template
      );
    } catch (error) {
      throw new HttpException(
        "errors.users.user_not_created_email",
        HttpStatus.FAILED_DEPENDENCY
      );
    }
  }

  async sendSubscriptionClient(to: string, object: IEmailSubscriptionClient) {
    try {
      const template = await this.generateTemplate<IEmailSubscriptionClient>(
        "subscription-client",
        object
      );
      await this.sendMail(
        to,
        "Registro exitoso en la plataofrma 'GE-Evaluaciones' ",
        template
      );
    } catch (error) {
      throw new HttpException(
        "errors.users.user_not_created_email",
        HttpStatus.FAILED_DEPENDENCY
      );
    }
  }

  async sendVerificationEmail(to: string, object: IEmailVerification) {
    try {
      const template = await this.generateTemplate<IEmailVerification>(
        "verification",
        object
      );
      console.log(template);
      await this.sendMail(
        to,
        "Verificacion de correo en la plataforma 'GE-Evaluaciones' ",
        template
      );
    } catch (e) {
      console.log(e);
      throw new HttpException(
        "errors.users.user_not_created_email",
        HttpStatus.FAILED_DEPENDENCY
      );
    }
  }

  async sendRecoveryPassword(to: string, object: IEmailRecoveryPassword) {
    try {
      const template = await this.generateTemplate<IEmailRecoveryPassword>(
        "recovery-password",
        object
      );
      await this.sendMail(
        to,
        "Recuperacion de contrasenia en 'GE-Evaluaciones' ",
        template
      );
    } catch (e) {
      throw new HttpException(
        "errors.users.user_not_created_email",
        HttpStatus.FAILED_DEPENDENCY
      );
    }
  }
}
