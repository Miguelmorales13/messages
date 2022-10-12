import { IsString, IsUrl } from "class-validator";

export class FireMessagesDto {

  @IsString({ message: "the body is required" })
  body?: string;

  @IsUrl({}, { message: "the format url is invalid" })
  icon?: string;

  @IsString({ message: "the title is required" })
  title?: string;
}
