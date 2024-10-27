import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// đầu não của module
// liên kết các module con
// export hoặc import 
