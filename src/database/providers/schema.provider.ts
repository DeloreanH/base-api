import { MongooseModule } from '@nestjs/mongoose';
import { modelName } from '../../database/model-names';
import { userSchema } from '../../database/schemas/user.schema';
import { sesionSchema } from '../schemas/sesion.schema';

export const schemaProvider = [
    MongooseModule.forFeature([
        { name: modelName.USER, schema: userSchema },
        { name: modelName.SESION, schema: sesionSchema },
    ]),
  ];
