import { createLocationDTO } from './createLocation.dto';
import { IsNotEmpty, IsArray } from 'class-validator';

export class createManyLocationDTO {
    @IsNotEmpty()
    @IsArray()
    readonly locations: createLocationDTO[];
}
