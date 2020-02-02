import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICrop } from '../../common/interfaces/interfaces';
import { CropService } from './crop.service';
import { createCropDTO } from '../../common/dtos/createCrop.dto';
import { updateCropDTO } from '../../common/dtos/updateCrop.dto';
import { deleteCropDTO } from '../../common/dtos/deleteCrop.dto';
import { restoreCropDTO } from '../../common/dtos/restoreCrop.dto';

@Controller('crop')
@UseGuards(AuthGuard('jwt'))
export class CropController {
    constructor(private cropService: CropService) {}

    @Get('list')
    async list(): Promise<ICrop[]> {
        return this.cropService.list();
    }
    @Get('list-trashed')
    async listTrashed(): Promise<ICrop[]> {
        return this.cropService.listTrashed();
    }
    @Post('create')
    async create(@Body() createCropDto: createCropDTO): Promise<ICrop> {
        return this.cropService.create(createCropDto);
    }
    @Post('update')
    async update(@Body() updateCropDto: updateCropDTO): Promise<ICrop> {
        return this.cropService.update(updateCropDto);
    }
    @Post('delete')
    async delete(@Body() deleteCropDto: deleteCropDTO): Promise<ICrop> {
        return this.cropService.delete(deleteCropDto);
    }
    @Post('restore')
    async restore(@Body() restoreCropDto: restoreCropDTO): Promise<ICrop> {
        return this.cropService.retore(restoreCropDto);
    }
}
