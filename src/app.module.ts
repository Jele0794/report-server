import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChromeController } from './chrome.controller';

@Module({
  imports: [],
  controllers: [AppController, ChromeController],
  providers: [AppService],
})
export class AppModule {}
