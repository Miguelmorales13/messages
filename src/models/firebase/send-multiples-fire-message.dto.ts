import { IsArray, IsNotEmptyObject } from "class-validator";
import { FireMessagesDto } from "./fire-messages.dto";

export class SendMultiplesFireMessageDto {

  @IsArray({ message: "the tokens is required" })
  token: string[];

  @IsNotEmptyObject({ nullable: false }, { each: true, message: "the data is required" })
  data: FireMessagesDto;
}
