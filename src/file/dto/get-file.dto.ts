import { IsUUID } from "class-validator";

export class GetFileDto {
  destination: string;
  fileName: string;
  @IsUUID()
  API_KEY: string;
}
