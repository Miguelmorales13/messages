import { IsNotEmptyObject, IsString } from "class-validator";
import { FireMessagesDto } from "./fire-messages.dto";

export class SendFireMessageDto {

  @IsString({ message: "the token is required" })
  token: string;

  @IsNotEmptyObject({ nullable: false }, { each: true, message: "the data is required" })
  data: FireMessagesDto;
}
