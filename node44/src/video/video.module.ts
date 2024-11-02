import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { SharedModule } from 'src/shared/sharedModule';
import { KeyModule } from 'src/key/key.module';

@Module({
  imports:[SharedModule,KeyModule],
  controllers: [VideoController],
  providers: [VideoService,JwtStrategy],
})
export class VideoModule {}
