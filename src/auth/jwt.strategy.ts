import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from "@nestjs/config";
// import { validate } from "class-validator";
import { BlacklistService } from './blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private blacklistService: BlacklistService,
    ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET') || 'bduskiv',
    });
    }

    async validate(payload: any) {
    const token = this.constructToken(payload);
    const isBlacklisted = await this.blacklistService.isBlacklisted(token);
    if (isBlacklisted) {
        throw new UnauthorizedException('Token is invalid or has expired');
    }
    return { userId: payload.sub, email: payload.email, role: payload.role };
    }

    private constructToken(payload: any): string {
    // Construct the token from the payload as needed
    return `Bearer ${payload.token}`;
    }
}