import { Injectable } from "@nestjs/common";
import { GetEnv } from "../../configs/env.validations";
import { Twilio } from "twilio";

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(GetEnv("TWILIO_ACCOUNT_SID"), GetEnv("TWILIO_AUTH_TOKEN"));
  }

  async sendSms(body: string, phone: string) {

    let messageInstance = await this.client.messages.create({ body, from: GetEnv("TWILIO_PHONE"), to: `+52${phone}` });
    console.log(messageInstance);

  }
}
