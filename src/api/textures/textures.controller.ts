import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TexturesService } from './textures.service';
import { createTextureDTO } from '../../common/dtos/createTexture.dto';
import { updateTextureDTO } from '../../common/dtos/updateTexture.dto';
import { deleteTextureDTO } from '../../common/dtos/deleteTexture.dto';
import { ITexture } from '../../common/interfaces/interfaces';

@Controller('textures')
@UseGuards(AuthGuard('jwt'))
export class TexturesController {
    constructor(private textureService: TexturesService) {}

    @Get('list')
    async list(): Promise<ITexture[]> {
        return this.textureService.list();
    }
    @Post('create')
    async create(@Body() createTextureDto: createTextureDTO): Promise<ITexture> {
        return this.textureService.create(createTextureDto);
    }
    @Post('update')
    async update(@Body() updateTextureDto: updateTextureDTO): Promise<ITexture> {
        return this.textureService.update(updateTextureDto);
    }
    @Post('delete')
    async delete(@Body() deleteTextureDto: deleteTextureDTO): Promise<ITexture> {
        return this.textureService.delete(deleteTextureDto);
    }

}
