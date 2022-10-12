import { TemplateEnum } from "../../enums/template.enum";
import { IsEmail, IsEnum } from "class-validator";

export class SendEmailRequestDto {
  @IsEmail({}, { message: "the email is invalid" })
  email: string;

  @IsEnum(TemplateEnum, { message: "the template is not type" })
  template: TemplateEnum;

  data: Object;

}
