import { MongooseModule } from '@nestjs/mongoose';
import { modelName } from 'src/database/model-names';
import { userSchema } from 'src/database/schemas/user.schema';

export const schemaProvider = [
    MongooseModule.forFeature([
        { name: modelName.USER, schema: userSchema },
    ]),
  ];
