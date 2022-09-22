import { TemplateEnum } from "../../enums/template.enum";

export class SendEmailRequestDto {
  email: string;
  template: TemplateEnum;
  data: Object;

}
