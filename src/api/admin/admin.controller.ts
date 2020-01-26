import { Controller, Body, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { createUserDTO } from '../../common/dtos/createUser.dto';
import { IUser } from '../../common/interfaces/interfaces';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('create-admin')
    async createAdmin(@Body() createAdmin: createUserDTO): Promise<IUser> {
        return this.adminService.createAdmin(createAdmin);
    }
    @Post('create-user')
    async createUser(@Body() createUser: createUserDTO): Promise<IUser> {
        return this.adminService.createUser(createUser);
    }
}
