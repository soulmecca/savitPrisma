import passport from 'passport';
import JwtStrategy from 'passport-jwt';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, ".env")})

const jwtOptions  = {
    jwtFromRequest = JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken();
    secret: process.env.JWT_SECRET
}

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({id: payload.id});

        if (user !== null) {
            return done(null, user);
        }else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }    
}

passport.use(new JwtStrategy(jwtOptions, verifyUser));
