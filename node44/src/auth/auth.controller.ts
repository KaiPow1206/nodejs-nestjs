import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { EmailDto } from './dto/mail.dto';
import { MailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService:MailService,
    private readonly configService:ConfigService
  ) {}

  @Post("/login")
  async login(
    @Body() body: LoginDto,
    @Res() res: Response
  ): Promise<Response<string>>{
    try {
      const result = await this.authService.login(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
  }

  @Post("/send-mail")
  @ApiBody({
    type:EmailDto
  })
  async sendMail(
    @Body() body:EmailDto,
    @Res() res:Response
  ){
    let emailTo=body.email;
    let subject=body.subject;
    let text=body.text;
    await this.emailService.sendEmail(emailTo,subject,text);
    return res.status(HttpStatus.OK).json({message:"Send mail successful !!"})
  }
}
