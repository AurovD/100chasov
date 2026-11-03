import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config({ path: 'server/.env' });

interface JwtPayload {
    code: string;
    date: number;
}

const cookieExtractor = (req: Request): string | null => req.cookies?.token || null;

passport.use(
    'access-jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET!,
        },
        (payload: any, done: VerifiedCallback) => {
            done(null, payload);
        }
    )
);

passport.use(
    'temp-jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_TEMPORARY_SECRET!,
        },
        (payload: JwtPayload, done: VerifiedCallback) => {
            done(null, payload);
        }
    )
);

export { passport };