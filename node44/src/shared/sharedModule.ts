import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import {CloudinaryUpLoadService } from "./cloudUpload.service";

@Module({
   imports:[CloudinaryModule],
   providers: [CloudinaryUpLoadService],
   exports:[CloudinaryUpLoadService]
})
export class SharedModule{

}