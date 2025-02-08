import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, JwtFromRequestFunction} from "passport-jwt";
import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config({
    path: 'server/.env'
});

interface OptsTypes  {
    jwtFromRequest: JwtFromRequestFunction<any>;
    secretOrKey: string | undefined
}

const opts: OptsTypes = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET
};

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload: {code: string; date: number}, done) {
    done(null, jwt_payload);
}));

export { passport };