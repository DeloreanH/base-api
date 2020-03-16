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
    async avatarUpload(@UploadedFile() file , @Body() uploadDocumentDto: UploadDocumentDTO): Promise<any>  {
        try {
            const document = await this.documentsService.findOneByCropId(uploadDocumentDto.cropId);
            let link: string;
            if (document) {
                const match = await this.documentsService.findByName(uploadDocumentDto.name);
                if (match  && !document._id.equals(match._id)) {
                    throw new HttpException('Name already registered', HttpStatus.BAD_REQUEST);
                }
                if (file) {
                    const oldFilePath = process.env.DOCUMENT_UPLOAD_PATH + '/' + document.path.split('/').pop();
                    if (existsSync(oldFilePath)) {
                        unlinkSync(oldFilePath);
                    }
                    link  = '/' + process.env.DOCUMENT_UPLOAD_PATH + '/' + file.filename;
                    document.name = uploadDocumentDto.name;
                    document.path = link;
                    return await document.save();
                }
                document.name = uploadDocumentDto.name;
                return await document.save();
            } else {
                link  = '/' + process.env.DOCUMENT_UPLOAD_PATH + '/' + file.filename;
                return this.documentsService.create(uploadDocumentDto, link);
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
