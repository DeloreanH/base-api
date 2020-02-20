import { Controller, Body, Post, UseGuards, Get, UseInterceptors, Res, UploadedFile, HttpStatus, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync, existsSync } from 'fs';
import { DocumentsService } from './documents.service';
import { IDocument } from '../../common/interfaces/interfaces';
import { DeleteDocumentDTO } from '../../common/dtos/deleteDocument.dto';
import { UploadDocumentDTO } from '../../common/dtos/uploadDocument.dto';

@Controller('documents')
@UseGuards(AuthGuard('jwt'))
export class DocumentsController {
    constructor(private documentsService: DocumentsService,
        ) {}

    @Get('list')
    async list(): Promise<IDocument[]> {
        return this.documentsService.list();
    }
    @Post('delete')
    async delete(@Body() deleteDocumentDto: DeleteDocumentDTO): Promise<IDocument> {
        return this.documentsService.delete(deleteDocumentDto);
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('document'))
    async avatarUpload(@UploadedFile() file , @Body() uploadDocumentDto: UploadDocumentDTO, @Res() res): Promise<any>  {
        try {
            const document = await this.documentsService.findOneByCropId(uploadDocumentDto.cropId);
            const link  = '/' + process.env.DOCUMENT_UPLOAD_PATH + '/' + file.filename;
            if (document) {
                const oldFilePath = process.env.DOCUMENT_UPLOAD_PATH + '/' + document.path.split('/').pop();
                if (existsSync(oldFilePath)) {
                    unlinkSync(oldFilePath);
                }
                await document.update({ name: uploadDocumentDto.name, path: link});
                return res.status(HttpStatus.OK).json({
                    status: 'avatar uploaded successfully',
                    link,
                 });
            } else {
                await this.documentsService.create(uploadDocumentDto, link);
                return res.status(HttpStatus.OK).json({
                    status: 'avatar uploaded successfully',
                    link,
                 });
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
