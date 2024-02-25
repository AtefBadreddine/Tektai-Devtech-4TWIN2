import { ApiProperty } from '@nestjs/swagger';
export class ResetPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  newPassword: string;
}