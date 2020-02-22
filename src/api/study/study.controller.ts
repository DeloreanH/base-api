import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IStudy } from '../../common/interfaces/interfaces';
import { StudyService } from './study.service';
import { createStudyDTO } from '../../common/dtos/createStudy.dto';
import { updateStudyDTO } from '../../common/dtos/updateStudy.dto';
import { deleteStudyDTO } from '../../common/dtos/deleteStudy.dto';
import { restoreStudyDTO } from '../../common/dtos/restoreStudy.dto';
import { AuthUserId } from 'src/auth/decorator/auth-decorators.decorator';

@Controller('study')
@UseGuards(AuthGuard('jwt'))
export class StudyController {
    constructor(private studyService: StudyService) {}

    @Get('list')
    async list(): Promise<IStudy[]> {
        return this.studyService.list();
    }
    @Get('list-trashed')
    async listTrashed(): Promise<IStudy[]> {
        return this.studyService.listTrashed();
    }
    @Get('show')
    async show(@AuthUserId() userId): Promise<IStudy[]> {
        return this.studyService.show(userId);
    }
    @Post('create')
    async create(@Body() createStudyDto: createStudyDTO): Promise<IStudy> {
        return this.studyService.create(createStudyDto);
    }
    @Post('update')
    async update(@Body() updateStudyDto: updateStudyDTO): Promise<IStudy> {
        return this.studyService.update(updateStudyDto);
    }
    @Post('delete')
    async delete(@Body() deleteStudyDto: deleteStudyDTO): Promise<IStudy> {
        return this.studyService.delete(deleteStudyDto);
    }
    @Post('restore')
    async restore(@Body() restoreStudyDto: restoreStudyDTO): Promise<IStudy> {
        return this.studyService.retore(restoreStudyDto);
    }
}
