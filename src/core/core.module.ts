import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';

@Global()
@Module({
    exports: [
        UserService,
      ],
      providers: [
        UserService,
      ],
})
export class CoreModule {}
