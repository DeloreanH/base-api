import { Module } from '@nestjs/common';
import { TexturesController } from './textures.controller';
import { TexturesService } from './textures.service';

@Module({
  controllers: [TexturesController],
  providers: [TexturesService],
})
export class TexturesModule {}
