import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

const secret = process.env.JWT_SECRET;  

const jwtOptions  = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
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

export const authenticateJwt = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
}

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
