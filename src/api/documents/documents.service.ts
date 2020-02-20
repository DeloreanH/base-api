import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync, unlinkSync } from 'fs';
import { Model } from 'mongoose';
import { modelName } from '../../database/model-names';
import { IDocument } from '../../common/interfaces/interfaces';
import { DeleteDocumentDTO } from '../../common/dtos/deleteDocument.dto';
import { UploadDocumentDTO } from '../../common/dtos/uploadDocument.dto';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectModel(modelName.DOCUMENT) private documentModel: Model<IDocument>,
    ) {}

    public async list(): Promise<IDocument[]> {
        return await this.documentModel.find({ deleted: { $ne: true } });
    }
    public async create(uploadDocumentDto: UploadDocumentDTO, link: string): Promise<IDocument> {
        const document = new this.documentModel({name: uploadDocumentDto.name , cropId: uploadDocumentDto.cropId, path: link});
        return await document.save();
    }
    public async delete(deleteDocumentDto: DeleteDocumentDTO): Promise<IDocument> {
        const document = await this.findById(deleteDocumentDto._id);
        if (!document) {
            throw new HttpException('Document not found', HttpStatus.BAD_REQUEST);
        } else {
            const oldFilePath = process.env.DOCUMENT_UPLOAD_PATH + '/' + document.path.split('/').pop();
            if (existsSync(oldFilePath)) {
                unlinkSync(oldFilePath);
            }
            return await document.remove();
        }
    }
    public async findOneByCropId(cropId: string): Promise<IDocument> {
        return await this.documentModel.findOne({cropId});
    }
    public async findById(id: string): Promise<IDocument> {
        return await this.documentModel.findOne({_id: id});
    }
}
