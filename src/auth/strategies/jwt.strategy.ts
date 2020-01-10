import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(req , payload: any, done: VerifiedCallback) {
    console.log(req.headers.authorization.split(' ')[1]);
    const user = await this.authService.validateUserToken(payload, req.headers.authorization.split(' ')[1]);
    if (user) {
      return done(null, user);
    }
    return done(
      new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
      false,
    );
  }
}
