import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { join } from "path";
import { SendFireMessageDto } from "../../models/firebase/send-fire-message.dto";
import { SendMultiplesFireMessageDto } from "../../models/firebase/send-multiples-fire-message.dto";

@Injectable()
export class FirebaseMessagesService {

  constructor() {
    const serviceAccount = require(join(__dirname, "..", "..", "..", "key-direbase.json"));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

  }

  async sendToDevice(data: SendFireMessageDto) {
    try {
      await admin.messaging().sendToDevice(
        [data.token]
        , {
          notification: data.data as any
        }
      );

    } catch (e) {
      console.log("error to send notifications", e);
    }
  }

  async sendToMultipleDevices(data: SendMultiplesFireMessageDto) {
    try {
      await admin.messaging().sendToDevice(
        data.token
        , {
          notification: data.data as any
        }
      );

    } catch (e) {
      console.log("error to send notifications", e);

    }
  }
}
