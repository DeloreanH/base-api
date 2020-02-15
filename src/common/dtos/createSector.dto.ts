import { sectorHumidityDTO } from './sectorHumidity.dto';
import { sectorLightDTO } from './sectorLight.dto';
import { sectorTemperatureDTO } from './sectorTemperature.dto';

export class createSectorDTO {
    readonly name: string;
    readonly pendingSince: number;
    readonly pendingUntil: number;
    readonly weatherId: string;
    readonly sectorHumidities: sectorHumidityDTO[];
    readonly sectorLights: sectorLightDTO[];
    readonly sectorTemperatures: sectorTemperatureDTO[];
}
