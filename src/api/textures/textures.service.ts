import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { ITexture } from '../../common/interfaces/interfaces';
import { createTextureDTO } from '../../common/dtos/createTexture.dto';
import { updateTextureDTO } from '../../common/dtos/updateTexture.dto';
import { deleteTextureDTO } from '../../common/dtos/deleteTexture.dto';

@Injectable()
export class TexturesService {
    constructor(
        @InjectModel(modelName.TEXTURE) private textureModel: Model<ITexture>,
    ) {}

    public async list(): Promise<ITexture[]> {
        return await this.textureModel.find({});
    }
    public async create(createtextureDto: createTextureDTO): Promise<ITexture> {
        const texture = new this.textureModel(createtextureDto);
        return await texture.save();
    }
    public async update(updatetextureDto: updateTextureDTO): Promise<ITexture> {
        const texture = await this.findById(updatetextureDto._id);
        if (!texture) {
            throw new HttpException('texture not found', HttpStatus.BAD_REQUEST);
        } else {
            texture.name = updatetextureDto.name;
            return await texture.save();
        }
    }
    public async delete(deletetextureDto: deleteTextureDTO): Promise<ITexture> {
        const texture = await this.findById(deletetextureDto._id);
        if (!texture) {
            throw new HttpException('texture not found', HttpStatus.BAD_REQUEST);
        } else {
            return await texture.remove();
        }
    }
    public async findById(id: string): Promise<ITexture> {
        return await this.textureModel.findOne({_id: id});
    }
}
