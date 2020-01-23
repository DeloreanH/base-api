export class createCropDTO {
    readonly name: string;
    readonly scientificName: string;
    readonly phSince: number;
    readonly phUntil: number;
    readonly temperatureSince: number;
    readonly temperatureUntil: number;
    readonly altitudeSince: number;
    readonly altitudeUntil: number;
    readonly hoursSince: number;
    readonly hoursUntil: number;
    readonly typographySince: number;
    readonly typographyUntil: number;
    readonly humiditySince: number;
    readonly humidityUntil: number;
    readonly conductivitySince: number;
    readonly conductivityUntil: number;
    readonly organicMaterialMinPercentage: number;
    readonly organicMaterialMaxPercentage: number;
    readonly texturesId: string[];
    readonly weatherId: string;
}
