import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MulterModule } from '@nestjs/platform-express';
import { setMulterOptions } from '../../common/tools/multer.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [

      MulterModule.registerAsync({
        useFactory(config: ConfigService) {
          return setMulterOptions(
            10485760,
            config.get('DOCUMENT_UPLOAD_PATH'),
            'pdf',
            );
        },
        inject: [ConfigService],
      }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
