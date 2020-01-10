import { Controller, Body, Post, Req, Res, HttpStatus, HttpException, UseGuards, Get } from '@nestjs/common';
import { LoginUserDTO } from '../common/dtos/loginUser.dto';
import { SignUpDTO } from '../common/dtos/signup.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDTO) {
        return await this.authService.login(loginUserDto);
    }
    @Post('register')
    async register(@Body() SignUpDto: SignUpDTO) {
        return await this.authService.register(SignUpDto);
    }
    @Post('logout')
    async logout(@Req() req, @Res() res) {
        try {
            await this.authService.logout(req.headers.authorization.split(' ')[1]);
            return res.status(HttpStatus.OK).json({
               status: 'logout successfully',
            });
        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req) {
      return req.user;
    }

}
