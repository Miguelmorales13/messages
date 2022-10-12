import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

enum EnvironmentTypes {
  Development = "development",
  Production = "production",
  Test = "test"
}

enum DialectsSequelize {
  Mysql = "mysql",
  PostgresSQL = "postgres",
  Mariadb = "mariadb"
}

class EnvValidations {

  @IsEnum(EnvironmentTypes, { message: "node envs es not accepted" })
  NODE_ENV: string;

  @IsString({ message: "the host is required" })
  HOST: string;

  @IsNumber({}, { message: "the port is undefined, please check your environments" })
  PORT: number;

  @IsString()
  EMAIL_HOST: string;
  @IsString()
  EMAIL_TEST: string;

  @IsString()
  EMAIL_SECURE: string;

  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASSWORD: string;

  @IsString()
  EMAIL_SERVICE: string;

  @IsNumber()
  EMAIL_PORT: number;

  @IsString()
  TWILIO_ACCOUNT_SID: string;

  @IsString()
  TWILIO_AUTH_TOKEN: string;

  @IsString()
  TWILIO_PHONE: string;

}

export const validate = (config: Record<string, unknown>) => {
  console.log(config);
  if (GetEnv("NODE_ENV") != "production") {
    const validatedConfig = plainToClass(
      EnvValidations,
      config,
      { enableImplicitConversion: true }
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
      console.log(errors);
      // throw new Error(errors.toString());
    }
    return validatedConfig;

  }
};

export const GetEnv = (name: keyof EnvValidations): any => {
  return process.env[name];
};
