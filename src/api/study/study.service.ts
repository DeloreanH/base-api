import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { Model } from 'mongoose';
import { IStudy } from '../../common/interfaces/interfaces';
import { createStudyDTO } from '../../common/dtos/createStudy.dto';
import { updateStudyDTO } from '../../common/dtos/updateStudy.dto';
import { deleteStudyDTO } from '../../common/dtos/deleteStudy.dto';
import { restoreStudyDTO } from '../../common/dtos/restoreStudy.dto';

@Injectable()
export class StudyService {
    constructor(
        @InjectModel(modelName.STUDY) private studyModel: Model<IStudy>,
    ) {}

    public async list(): Promise<IStudy[]> {
        return await this.studyModel.find({ deleted: { $ne: true } });
    }
    public async listTrashed(): Promise<IStudy[]> {
        return await this.studyModel.find({ deleted: { $ne: false } });
    }
    public async create(createStudyDto: createStudyDTO): Promise<IStudy> {
        const study = new this.studyModel(createStudyDto);
        return await study.save();
    }
    public async show(userId: string): Promise<IStudy[]> {
        return await this.studyModel.find({ userId , deleted: { $ne: true } });
    }
    public async showById(id: string): Promise<IStudy[]> {
        return await this.studyModel.find({ _id: id , deleted: { $ne: true } });
    }
    public async update(updateStudyDto: updateStudyDTO): Promise<IStudy> {
        const study = await this.findById(updateStudyDto._id);
        if (!study) {
            throw new HttpException('study not found', HttpStatus.BAD_REQUEST);
        } else {
            study.texturesId       = updateStudyDto.texturesId;
            study.sectorId         = updateStudyDto.sectorId;
            study.locationId       = updateStudyDto.locationId;
            study.userId           = updateStudyDto.userId;
            study.month            = updateStudyDto.month;
            study.name             = updateStudyDto.name;
            study.ph               = updateStudyDto.ph;
            study.mo               = updateStudyDto.mo;
            return await study.save();
        }
    }
    public async delete(deleteStudyDto: deleteStudyDTO): Promise<IStudy> {
        const study = await this.findById(deleteStudyDto._id);
        if (!study) {
            throw new HttpException('study not found', HttpStatus.BAD_REQUEST);
        } else {
            study.deleted = true;
            return await study.save();
        }
    }
    public async retore(restoreStudyDto: restoreStudyDTO): Promise<IStudy> {
        const study = await this.findById(restoreStudyDto._id);
        if (!study) {
            throw new HttpException('study not found', HttpStatus.BAD_REQUEST);
        } else {
            study.deleted = false;
            return await study.save();
        }
    }
    public async findById(id: string): Promise<IStudy> {
        return await this.studyModel.findOne({_id: id});
    }
}
