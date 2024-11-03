import { Injectable } from "@nestjs/common";
import {Transporter,createTransport} from 'nodemailer';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService{
   private transporter:Transporter;
   constructor(
      private configService: ConfigService
   ){
      this.transporter = createTransport({
         host: "smtp.gmail.com",
         port: 587,
         auth:{
            user: this.configService.get<String>("EMAIL_USER"),
            pass:this.configService.get<String>("EMAIL_PASS")
         }
      })
   }
   async sendEmail(to:string,subject:string,text:string,html?:string){
      const mailOption= {
         from:this.configService.get<String>("EMAIL_USER"),
         to,
         subject,
         text,
         html,
      }
      return await this.transporter.sendMail(mailOption);
   }
}